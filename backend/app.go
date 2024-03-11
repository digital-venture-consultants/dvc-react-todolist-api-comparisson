package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type List struct {
	Id     int    `json:"id"`
	Text   string `json:"text"`
	Author string `json:"author"`
	Done   bool   `json:"done"`
}

var lists []List
var id = 1

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Content-Type", "text/html; charset=utf-8")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
}

func addListItem(w http.ResponseWriter, r *http.Request) {
	var listItem List
	err := json.NewDecoder(r.Body).Decode(&listItem)
	if err != nil {
		return
	}
	listItem.Id = id
	id = id + 1
	lists = append(lists, listItem)

	listJson, _ := json.Marshal(listItem)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	w.Write(listJson)
}

func getList(w http.ResponseWriter, r *http.Request) {
	listJson, _ := json.Marshal(lists)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	w.Write(listJson)
}

func todoList(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	switch r.Method {
	case "GET":
		getList(w, r)
		break
	case "POST":
		addListItem(w, r)
		break
	default:
		fmt.Fprintf(w, "Sorry, only GET and POST methods are supported.")
	}
}

func main() {
	http.HandleFunc("/todo", todoList)

	err := http.ListenAndServe(":1337", nil)
	fmt.Print(err)
}
