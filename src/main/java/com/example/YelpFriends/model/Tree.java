package com.example.YelpFriends.model;

import java.util.*;

import com.example.YelpFriends.repository.UserRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Tree {
    // @Autowired
    private TreeNode root;

    @JsonIgnore
    private Set<String> firstDegFriends = new HashSet<>();

    @JsonIgnore
    private Map<String, Integer> secondDegFriends = new HashMap<>();

    @Autowired
    UserRepository userRepository;

    public Tree() {

    }

    public void buildTree(String userId) {
        long startTime = System.nanoTime();
        Optional<User> tempUser = userRepository.findByUserId(userId);
        if (!tempUser.isPresent()){
            this.root = null;
            return;
        }
        User user = tempUser.get();
        TreeNode root = new TreeNode(userId);
        this.root = root;
        
        for (String firstDegreeFriend : user.getFriends()) {
            if (!userRepository.existsByUserId(firstDegreeFriend)){
                continue;
            }
            TreeNode friend = new TreeNode(firstDegreeFriend,root);
            root.addChildNode(friend);
            User tempFirstDegreeFriend = userRepository.findByUserId(firstDegreeFriend).get();
            for (String secondDegreeFriend : tempFirstDegreeFriend.getFriends()) {
                if(!userRepository.existsByUserId(secondDegreeFriend) || root.getUserId().equals(secondDegreeFriend)){
                    continue;
                }
                friend.addChildNode(new TreeNode(secondDegreeFriend,friend));
            }
        }
        long endTime = System.nanoTime();
        System.out.println("Time taken to build a Tree is " + (endTime - startTime) + "ns");
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

    public Map<String, Integer> findSecondDegree() {
        long startTime = System.nanoTime();

        // BFS
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);

        TreeNode tempNode;
        while (!queue.isEmpty()) {
            tempNode = queue.poll();

            // add if depth is 2 and if not already in first deg list
            if(depth(tempNode) == 2 && !firstDegFriends.contains(tempNode.getUserId())) {
                // check if second deg friend exists in map 
                if (secondDegFriends.containsKey(tempNode.getUserId())) {
                    // increase mutual friends count by 1
                    int mutualFriends = secondDegFriends.get(tempNode.getUserId());
                    secondDegFriends.put(tempNode.getUserId(), mutualFriends + 1);
                } else {
                    // put second deg friend in map with mutual friend count 1
                    secondDegFriends.put(tempNode.getUserId(), 1);
                }
            }

            List<TreeNode> children = tempNode.getChildren();
            Iterator<TreeNode> itr = children.iterator();
            while(itr.hasNext()) {
                queue.add(itr.next());
            }
        }

        long endTime = System.nanoTime();
        System.out.println("Time taken to get second degree from Tree is " + (endTime - startTime) + "ns");
        return secondDegFriends;
    }

    public Set<String> findFirstDegree() {
        long startTime = System.nanoTime();
        
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

        long endTime = System.nanoTime();
        System.out.println("Time taken to get first degree from Tree is " + (endTime - startTime) + "ns");
        return firstDegFriends;
    }

}