import os
import re

path = "app/(storefront)/verify/verify.module.css"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Replace .resultIconSuccess block
old_success = """.resultIconSuccess {
  background: var(--acid);
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--acid) 45%, transparent);
  animation: pulseGlow 1.4s ease-out 1;
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--acid) 45%, transparent);
  }
  100% {
    box-shadow: 0 0 0 26px color-mix(in srgb, var(--acid) 0%, transparent);
  }
}"""

new_success = """.resultIconSuccess {
  background: var(--acid);
  transform: scale(0);
  animation: popInSuccess 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes popInSuccess {
  0% {
    transform: scale(0);
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--acid) 80%, transparent);
  }
  50% {
    transform: scale(1.15);
    box-shadow: 0 0 0 25px color-mix(in srgb, var(--acid) 0%, transparent);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--acid) 0%, transparent);
  }
}"""

text = text.replace(old_success, new_success)

# Replace .checkPath block
old_check = """.checkPath {
  stroke-dasharray: 28;
  stroke-dashoffset: 28;
  animation: draw 0.5s ease-out 0.15s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}"""

new_check = """.checkPath {
  stroke-dasharray: 28;
  stroke-dashoffset: 28;
  animation: swooshDraw 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
}

@keyframes swooshDraw {
  0% {
    stroke-dashoffset: 28;
  }
  100% {
    stroke-dashoffset: 0;
  }
}"""

text = text.replace(old_check, new_check)

with open(path, "w", encoding="utf-8") as f:
    f.write(text)
