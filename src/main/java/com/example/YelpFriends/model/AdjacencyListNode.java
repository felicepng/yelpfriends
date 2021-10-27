package com.example.YelpFriends.model;

public class AdjacencyListNode {
    private String value;
    // private AdjacencyListNode next;

    public AdjacencyListNode(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    // public AdjacencyListNode getNext() {
    //     return next;
    // }

    // public AdjacencyListNode setNext(AdjacencyListNode next) {
    //     this.next = next;
    // }
}