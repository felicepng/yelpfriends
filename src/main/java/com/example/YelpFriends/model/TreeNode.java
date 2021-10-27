package com.example.YelpFriends.model;
import java.util.*;

public class TreeNode {
    private String value;
    private TreeNode parent;
    private int numChildren;
    private List<TreeNode> children;

    public TreeNode(String value, TreeNode parent) {
        this.parent = parent;
        this.value = value;
        this.children = new ArrayList<>();
        this.numChildren = 0;
    }

    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public TreeNode getParent() {
        return this.parent;
    }

    public void setParent(TreeNode parent) {
        this.parent = parent;
    }

    public int getNumChildren() {
        return this.numChildren;
    }

    public void setNumChildren(int numChildren) {
        this.numChildren = numChildren;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }
}