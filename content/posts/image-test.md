---
title: "Image Test Page"
date: 2025-03-02
draft: false
---

## Testing Image Loading

This page tests various ways of loading images to diagnose display issues.

### Method 1: Markdown Image Syntax with Relative Path
![Logo Image](/images/logo.png)

### Method 2: Markdown Image Syntax with Absolute URL
![Logo Image](https://den-bogdanov.github.io/images/logo.png)

### Method 3: HTML Image Tag with Relative Path
<img src="/images/logo.png" alt="Logo Image" width="200">

### Method 4: HTML Image Tag with Absolute URL
<img src="https://den-bogdanov.github.io/images/logo.png" alt="Logo Image" width="200">

### Method 5: Hugo Figure Shortcode
{{< figure src="/images/logo.png" alt="Logo Image" width="200" >}}

### Method 6: Hugo Image Processing
{{< img src="/images/logo.png" alt="Logo Image" width="200" >}}

### Method 7: Static Path Reference
<img src="{{ .Site.BaseURL }}images/logo.png" alt="Logo Image" width="200">

### Method 8: Using relURL Function
<img src="{{ "/images/logo.png" | relURL }}" alt="Logo Image" width="200">

### Method 9: Using absURL Function
<img src="{{ "/images/logo.png" | absURL }}" alt="Logo Image" width="200">

### Method 10: Using resources.Get
{{ $image := resources.Get "images/logo.png" }}
{{ with $image }}
<img src="{{ .RelPermalink }}" alt="Logo Image" width="200">
{{ end }} 