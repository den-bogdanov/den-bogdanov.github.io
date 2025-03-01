---
title: "Meta Releases Apollo: A Family of Multimodal Models for Video Processing"
date: 2024-12-21
draft: false
tags: ["AI", "Meta", "Video Processing", "Multimodal Models", "Apollo"]
categories: ["AI", "Technology"]
description: "Meta has released Apollo, a family of multimodal models designed for video processing, capable of understanding temporal relationships, answering complex questions, and running locally on consumer hardware."
---

# Meta Releases Apollo: A Family of Multimodal Models for Video Processing

![Meta Apollo Models](/posts/meta-apollo-video-models/images/apollo-main.jpg)

Meta has released the Apollo family of multimodal models for video processing, with several noteworthy features that deserve attention.

Apollo is a lineup of models (1.5B, 3B, and 7B) capable of working with videos up to an hour in length. These models can:

- Understand temporal relationships in videos
- Answer complex questions about content
- Engage in multi-turn dialogues based on video
- Perform OCR tasks and spatial analysis
- Work with egocentric (first-person) video

The performance of even the smaller models is impressive:

- Apollo-1.5B outperforms some 7B models, including Phi-3.5-Vision and LongVA-7B
- Apollo-3B surpasses most existing 7B models in benchmarks, scoring 68.7 on MLVU and 62.7 on ApolloBench
- Apollo-7B competes with models larger than 30B parameters, achieving 70.9 on MLVU and 66.3 on ApolloBench

What's particularly exciting is that these models can run locally. Reports on Reddit already show successful deployment of Apollo on an RTX 3090 - requiring approximately 15GB of VRAM and about 40 seconds to process the first token. However, the initial setup requires some effort due to suboptimal documentation and hardcoded values.

The models are built on Qwen 2.5 and SigLip, with source code already available on GitHub. You can try an online demo on HuggingFace. More details about the project can be found on the official website.

It's clear that Meta is seriously continuing the development of open multimodal models. Apollo appears to be a strong competitor to existing solutions, especially considering the possibility of local deployment.

---

Have you tried running Apollo models locally? Share your experience in the comments below. 