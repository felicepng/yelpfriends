package com.example.YelpFriends.model;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class TreeNode {
    private String userId;
    @JsonIgnore
    private TreeNode parent;
    private int numChildren;
    private List<TreeNode> children;

    public TreeNode(String userId) {
        this.userId = userId;
        this.children = new ArrayList<>();
        this.numChildren = 0;
    }

    public TreeNode(String userId, TreeNode parent) {
        this.parent = parent;
        this.userId = userId;
        this.children = new ArrayList<>();
        this.numChildren = 0;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public TreeNode addChild(String value) {
        TreeNode newChild = new TreeNode(value, this);
        this.children.add(newChild);
        this.setNumChildren(this.numChildren + 1);
        return newChild;
    }

    public TreeNode addChildNode(TreeNode child) {
        this.children.add(child);
        this.setNumChildren(this.numChildren + 1);
        return child;
    }
}