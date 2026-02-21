"use client";

import React, { useRef, ReactNode, ReactElement, cloneElement, isValidElement } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopyProps {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}

interface SplitTextInstance {
  chars: HTMLElement[];
  revert: () => void;
}

declare module "gsap" {
  interface TweenVars {
    scrollTrigger?: ScrollTrigger.Vars;
  }
}

export default function Copy({ 
  children, 
  animateOnScroll = true, 
  delay = 0 
}: CopyProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<HTMLElement[]>([]);
  const splitRefs = useRef<SplitTextInstance[]>([]);
  const chars = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRefs.current = [];
      chars.current = [];
      elementRefs.current = [];

      let elements: HTMLElement[] = [];
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children) as HTMLElement[];
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        elementRefs.current.push(element);

        const split = SplitText.create(element, {
          type: "chars",
          mask: "chars",
          charsClass: "char++",
        }) as SplitTextInstance;

        splitRefs.current.push(split);
        chars.current.push(...split.chars);
      });

      gsap.set(chars.current, { y: "100%" });

      const animationProps: gsap.TweenVars = {
        y: "0%",
        duration: 1,
        stagger: 0.03,
        ease: "power4.out",
        delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(chars.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(chars.current, animationProps);
      }

      return () => {
        splitRefs.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  if (React.Children.count(children) === 1) {
    const child = React.Children.only(children);
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, { ref: containerRef });
    }
    return child as ReactElement;
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}