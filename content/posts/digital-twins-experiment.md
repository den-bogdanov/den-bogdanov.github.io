---
title: "Digital Twins: Stanford and Google Create AI Replicas of Real People"
date: 2024-11-21
draft: false
tags: ["AI", "Digital Twins", "Stanford", "Google", "Research", "Simulation"]
categories: ["Technology", "AI", "Research"]
description: "Researchers from Stanford and Google conducted an experiment creating digital twins of real people with personalities, character traits, and habits, achieving 85% accuracy in replicating human responses to surveys and tests."
---

# Digital Twins: Stanford and Google Create AI Replicas of Real People

![Digital Twins Experiment](/posts/digital-twins-experiment/images/digital-twins-main.jpg)

Researchers from Stanford and Google have conducted a groundbreaking experiment in creating digital twins of real people. These aren't just abstract simulations but specific replicas with personality, character traits, and habits. The goal was to enable testing of various new rules and systems on AI models rather than actual humans.

## The Experiment

The research team selected one thousand individuals and interviewed each for approximately two hours using an AI interviewer. These conversation transcripts were then fed to GPT-4o for simulation. Afterward, they tested how accurately these digital copies replicated the originals.

The results were remarkable - the digital twins achieved an 85% match rate in sociological surveys, plus nearly identical results in psychological tests and economic games.

![Digital Twins Results](/posts/digital-twins-experiment/images/digital-twins-results.jpg)

## The Interview Process

The researchers used a structured approach to create these digital twins:

```
Here is a conversation between an interviewer and an interviewee.
<INPUT: The transcript of the most recent part of the
conversation>
Task: Succinctly summarize the facts about the interviewee based
on the conversation above in a few bullet points -- again, think
short, concise bullet points.
```

For the interview process itself, they used a detailed prompt structure:

```
Description of the interviewer (Isabella): friendly and curious
Notes on the interviewee: <INPUT: Reflection notes about the
participant>
Context:
This is a hypothetical interview between the interviewer and an
interviewee. In this conversation, the interviewer is trying to
ask the following question: "<INPUT: The question in the
interview script>"
Current conversation:
<INPUT: The transcript of the most recent part of the
conversation>
=*=*=
Task Description:
Interview objective: By the end of this conversation, the
interviewer has to learn the following: <INPUT: Repeat of the
question in the interview script, paraphrased as a learning
objective>
Safety note: In an extreme case where the interviewee
*explicitly* refuses to answer the question for privacy reasons,
do not force the interviewee to answer by pivoting to other
relevant topics.
Output the following:
1) Assess the interview progress by reasoning step by step --
what did the interviewee say so far, and in your view, what would
count as the interview objective being achieved? Write a short
(3~4 sentences) assessment on whether the interview objective is
being achieved. While staying on the current topic, what kind of
follow-up questions should the interviewer further ask the
interviewee to better achieve your interview objective?
2) Author the interviewer's next utterance. To not go too far
astray from the interview objective, author a follow-up question
that would better achieve the interview objective.
```

## Key Findings

The most surprising discovery was that a two-hour heart-to-heart conversation was sufficient to create an accurate digital twin. Traditional questionnaires and demographic data don't come close to providing this level of accuracy.

This research opens up new possibilities for testing social policies, user interfaces, and other human-centered systems without requiring actual human participants for every iteration.

## Implications

The ability to create such accurate digital twins raises both exciting possibilities and ethical questions:

1. **Research Efficiency**: Testing hypotheses on digital twins before involving real humans could accelerate research
2. **Personalization**: Systems could be tailored to individuals based on their digital twin's preferences
3. **Privacy Concerns**: The detailed personal information required to create these twins raises privacy questions
4. **Identity Issues**: What rights might a digital replica have, if any?

## Conclusion

This breakthrough demonstrates how AI can now capture not just general human behavior but the specific traits and tendencies of individuals. As this technology develops, it will likely transform how we conduct research, design products, and understand human behavior.

---

What do you think about the creation of digital twins? Would you be comfortable having an AI version of yourself used for research purposes? Share your thoughts in the comments below. 