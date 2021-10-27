package com.example.YelpFriends.model;

public class Tree {
    TreeNode root;

    public TreeNode getRoot() {
        return this.root;
    }

    public void setTreeNode(TreeNode root) {
        this.root = root;
    }

    public TreeNode getParent(TreeNode node) {
        return node.getParent();
    }

    public boolean isInternal(TreeNode node) {
        return node.getNumChildren() > 0;
    }

    public boolean isExternal(TreeNode node) {
        return node.getNumChildren() == 0;
    }

    public boolean isRoot(TreeNode node) {
        return node == getRoot();
    }

    public int maxDepth(TreeNode node) {
        if (root == null) {
            return 0;
        }
        
        int max = 0;
        
        for (TreeNode child : root.getChildren()) {
            max = Math.max(max, maxDepth(child));
        }
        
        return 1 + Math.max(max, 0);
    }
}