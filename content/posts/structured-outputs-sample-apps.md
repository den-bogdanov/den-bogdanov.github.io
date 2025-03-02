---
title: "Structured Outputs Sample Apps: Building Applications with OpenAI's Structured Data"
date: 2025-01-15
draft: false
tags: ["AI", "OpenAI", "Development", "Structured Data", "Applications"]
categories: ["AI", "Development"]
description: "Exploring a repository of sample applications that demonstrate how to create structured data requests from OpenAI models"
---

# Structured Outputs Sample Apps: Building Applications with OpenAI's Structured Data

![Main Image](/posts/structured-outputs-sample-apps/images/structured-outputs-sample-apps-image-1.jpg)

Structured Outputs Sample Apps is a repository containing example applications that demonstrate how to create requests for structured data from OpenAI models. The repository features three distinct applications, each showcasing different capabilities and use cases.

## Resume Extraction

![Resume Extraction](/posts/structured-outputs-sample-apps/images/structured-outputs-sample-apps-image-2.jpg)

The first application parses PDF resumes and converts them into structured JSON format. This demonstrates how AI can extract specific information from unstructured documents and organize it into a standardized format that's easy to process programmatically.

## Generative UI

The second application generates responses to questions with embedded diagrams. It recursively parses the model's response to create rich, visual content. This showcases how AI can not only provide text-based answers but also generate visual representations of data to enhance understanding.

## Conversational Assistant

![Conversational Assistant](/posts/structured-outputs-sample-apps/images/structured-outputs-sample-apps-image-3.jpg)

The third and most complex example combines elements from the previous two applications. This application demonstrates how AI can create an interactive interface during a conversation with a user. Here's what it can do:

- "Show me available products" → generates a carousel with product cards
- "Compare prices and sizes" → creates an interactive table with sorting capabilities
- "Give me an overview of product weights" → displays an attractive bar chart
- "Tell me more about CryoEngine" → shows a product card with detailed information

All components are created on-the-fly through chat - no coding required. The AI determines which type of visualization best suits the data. The interface is fully functional - users can add products to a cart, process returns, and more.

This last application serves as an excellent foundation for a universal communication agent for various tasks.

## The Broader Context

Meanwhile, Pietro (affiliated with Anthropic) reminds us that most models are capable of providing structured responses, though often not on the first try. All that's needed is to provide an example response in the prompt, validate the response, and in case of problems, ask the question again.

This approach to building applications with structured outputs from AI models represents a significant step forward in creating more interactive, dynamic, and user-friendly AI-powered interfaces without extensive custom development.

---

Have you experimented with structured outputs from AI models? What applications do you see for this technology in your work? Share your thoughts in the comments below!
