package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"strconv"
	"time"
)

type List struct {
	Id     int    `json:"id"`
	Text   string `json:"text"`
	Author string `json:"author"`
	Done   bool   `json:"done"`
}

type RemoveRequest struct {
	Id int `json:"id"`
}

var lists []List
var id = 1

func addListItem(context *gin.Context) {
	var list List
	decoder := json.NewDecoder(context.Request.Body)
	err := decoder.Decode(&list)
	if err != nil {
		fmt.Printf("error %s", err)
		context.JSON(501, gin.H{"error": err})
	}

	list.Id = id
	id = id + 1
	lists = append(lists, list)

	context.JSON(200, list)
}

func RemoveIndex(s []List, index int) []List {
	return append(s[:index], s[index+1:]...)
}

func removeListItem(context *gin.Context) {
	id := context.Param("Id")
	// string to int
	i, err := strconv.Atoi(id)
	if err != nil {
		// ... handle error
		panic(err)
	}
	lists = RemoveIndex(lists, i)
	context.JSON(200, lists)
}

func resetList(context *gin.Context) {
	lists = make([]List, 0)
	context.JSON(200, lists)
}

func getList(context *gin.Context) {
	context.JSON(200, lists)
}

func todoList(rg *gin.RouterGroup) {
	rg.POST("", addListItem)
	rg.DELETE("", resetList)
	rg.DELETE(":Id", removeListItem)

	time.Sleep(500 * time.Millisecond)
	rg.GET("", getList)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	server := gin.Default()
	server.Use(CORSMiddleware())
	toDo := server.Group("/todo")
	todoList(toDo)

	err := server.Run(":1337")
	if err != nil {
		panic("[Error] failed to start Gin server due to: " + err.Error())
		return
	}

}
