package com.example.YelpFriends.model;

import java.util.*;

import com.example.YelpFriends.repository.UserRepository;


public class Tree {
    // @Autowired
    private TreeNode root;
    private Set<String> firstDegFriends = new HashSet<>();
    private Set<String> secondDegFriends = new HashSet<>();

    // @Autowired
    UserRepository userRepository;
    // public Tree(String userId) {
    // TreeNode root = new TreeNode(userId);
    // this.root = root;

    // }

    public Tree(User user) {
        TreeNode root = new TreeNode(user.getUserId());
        this.root = root;
        for (String firstDegreeFriend : user.getFriends()) {
            TreeNode friend = new TreeNode(firstDegreeFriend);
            root.addChildNode(friend);
            Optional<User> temp = userRepository.findByUserId(firstDegreeFriend);
            if (!temp.isPresent()) {
                continue;
            }
            User firstDegreeUser = temp.get();
            for (String secondDegreeFriend : firstDegreeUser.getFriends()) {
                friend.addChild(secondDegreeFriend);
            }
        }
    }

    public TreeNode getRoot() {
        return this.root;
    }

    public void setRoot(TreeNode root) {
        this.root = root;
    }

    // public TreeNode getParent(TreeNode node) {
    // return node.getParent();
    // }

    // public boolean isInternal(TreeNode node) {
    //     return node.getNumChildren() > 0;
    // }

    // public boolean isExternal(TreeNode node) {
    //     return node.getNumChildren() == 0;
    // }

    public boolean isRoot(TreeNode node) {
        return node == getRoot();
    }

    public int depth(TreeNode node) {
        int depth = 0;
        while (node.getParent()!=null){
            node = node.getParent();
            depth++;
        }
        return depth;
    }

    public Set<String> getSecondDegree(TreeNode root) {
        // BFS
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);

        TreeNode tempNode;
        while (!queue.isEmpty()) {
            tempNode = queue.poll();

            // add if depth is 2 and if not already in first deg list
            if(depth(tempNode) == 2 && !firstDegFriends.contains(tempNode.getUserId())) {
                secondDegFriends.add(tempNode.getUserId());
            }

            List<TreeNode> children = tempNode.getChildren();
            Iterator<TreeNode> itr = children.iterator();
            while(itr.hasNext()) {
                queue.add(itr.next());
            }
        }

        return secondDegFriends;
    }

    public Set<String> getFirstDegree(TreeNode root) {
        // BFS
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);

        TreeNode tempNode;
        while (!queue.isEmpty()) {
            tempNode = queue.poll();
            // add if depth is 1
            if(depth(tempNode) == 1) { 
                firstDegFriends.add(tempNode.getUserId());
            }

            List<TreeNode> children = tempNode.getChildren();
            Iterator<TreeNode> itr = children.iterator();
            while(itr.hasNext()) {
                queue.add(itr.next());
            }
        }

        return firstDegFriends;
    }

}