package com.dvc.demoapi;

// Listenelement Klasse
class ListItem {
    private int id;
    private String text;
    private String author;
    private boolean done;

    public ListItem(int id, String text, String author, boolean done) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.done = done;
    }

    // Getter und Setter für Serialisierung
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}