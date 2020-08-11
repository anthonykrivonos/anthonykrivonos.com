---
templateKey: article
title: Classifying COVID Patients from Lung Scans
subtitle: Machine Learning
caption: Spring 2020
image: /img/covid.jpg
tags:
  - COVID-19
  - Machine Learning
  - Classification
  - Neural Nets
  - ConvNets
date: 2020-05-16T03:22:27.237Z
---
<script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"></script>

> Taken from [this paper](https://github.com/anthonykrivonos/COVisualize-19/blob/master/paper.pdf) I wrote after placing 2nd on Kaggle.

## Abstract

With the advent of COVID-19, it has become a major challenge in Machine Learning to be able
to classify infected lungs from healthy lungs using merely x-ray images. We present three methods for classifying x-ray images—Support Vector Machines, Multi-Layer Neural Networks, and Residual Convolutional Neural Networks—and discuss their performance on classifying healthy lungs, bacterially-infected lungs, virally-infected lungs, and COVID-19-infected lungs using 1,127 training images. We also show four methods for pre-processing raw x-ray images and the effects of each technique on classification across each classification method. Finally, we conclude that CORONet, our predictably-named custom residual convolutional neural network, exhibits the greatest classification accuracy on a holdout training data set, leading to a Kaggle submission score of 0.87908.

## Introduction

Knee-deep in the greatest pandemic of the past century, our society has had little on our minds besides diagnosing, treating, and finding a vaccine for SARS-CoV-2
(hereby ”COVID-19”).(1) Using modern machine learning techniques, 350 images of normal lungs, 350 images of lungs with bacterial pneumonia, 350 images of lungs with viral pneumonia, and 77 images of lungs infected with COVID-19 were examined and used to train three models to classify images of human lungs. These models were then tested on 484 test images and submitted to the COMS 4771 COVID Challenge on Kaggle.

To be continued...
