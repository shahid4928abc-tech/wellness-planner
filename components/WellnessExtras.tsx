"use client";

import { useState } from "react";

const habits = [
  { title: "Morning hydration", detail: "Give yourself a fresh start", time: "5 min", icon: "☼" },
  { title: "Mindful movement", detail: "Stretch, walk, or simply breathe", time: "10 min", icon: "↗" },
  { title: "Write a little", detail: "Clear some space in your mind", time: "5 min", icon: "✎" },
  { title: "Take a screen break", detail: "Give your eyes a moment to rest", time: "5 min", icon: "◒" },
];

const library = [
  { number: "01 / REST", icon: "☾", title: "Rest & recharge", description: "Create a softer evening, improve your bedtime habits, and make room for genuine rest.", tags: ["Better sleep", "Evening rituals"], style: "sleep", target: "#weekly-reset" },
  { number: "02 / MIND", icon: "✳", title: "Mindful moments", description: "Explore journaling, gratitude, breathing exercises, and small moments of reflection.", tags: ["Reflection", "Mindfulness"], style: "mind", target: "#checkin" },
  { number: "03 / BODY", icon: "↗", title: "Move your way", description: "Find simple ways to stretch, walk, hydrate, and reconnect with what your body needs.", tags: ["Movement", "Daily habits"], style: "move", target: "#planner" },
];

const weeklyPlans = [
  { day: "MON", title: "Start with intention", detail: "Choose one meaningful priority." },
  { day: "WED", title: "Pause and check in", detail: "Notice how you're really feeling." },
  { day: "FRI", title: "Celebrate small wins", detail: "Recognize the progress you've made." },
  { day: "SUN", title: "Reset without pressure", detail: "Prepare gently for the week ahead." },
];

export function WellnessExtras() {
  const [completed, setCompleted] = useState<number[]>([0]);
  const [mood, setMood] = useState("Okay");
  const [journal, setJournal] = useState("");
  const [savedReflection, setSavedReflection] = useState("");
  const progress = Math.round((completed.length / habits.length) * 100);

  function toggleHabit(index: number) {
    setCompleted((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="site wellness-extras">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap");

        :root {
          --mint: #a6ebc9;
          --neon: #61ff7e;
          --fresh: #5eeb5b;
          --leaf: #62ab37;
          --dark: #393424;
          --paper: #f5f5ed;
          --white: #fffef9;
          --muted: #818473;
          --line: #e1e4d8;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 90px;
        }

        body {
          margin: 0;
          color: var(--dark);
          background: var(--paper);
          font-family: "DM Sans", sans-serif;
        }

        button,
        a,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button:focus-visible,
        a:focus-visible,
        textarea:focus-visible {
          outline: 3px solid var(--leaf);
          outline-offset: 3px;
        }

        .site {
          width: 100%;
          overflow: hidden;
        }

        .navbar {
          height: 78px;
          padding: 0 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: var(--paper);
          position: relative;
          z-index: 20;
          border-bottom: 1px solid rgba(57, 52, 36, 0.08);
        }

        .logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font: 800 23px "Manrope", sans-serif;
          letter-spacing: -1.2px;
          white-space: nowrap;
        }

        .logo-symbol {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 12px 12px 12px 4px;
          background: var(--neon);
          color: var(--dark);
          font-size: 22px;
          transform: rotate(-5deg);
          box-shadow: 3px 4px 0 rgba(57, 52, 36, 0.1);
        }

        .nav-links {
          display: flex;
          gap: 27px;
          align-items: center;
          color: #737563;
          font-size: 12px;
          font-weight: 700;
        }

        .nav-links a,
        .footer-links a {
          transition: color 0.2s ease;
        }

        .nav-links a:hover,
        .footer-links a:hover {
          color: var(--leaf);
        }

        .button-dark,
        .button-lime {
          border: 0;
          padding: 14px 19px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          font-size: 12px;
          font-weight: 800;
          border-radius: 4px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 4px 4px 0 rgba(57, 52, 36, 0.12);
        }

        .button-dark {
          background: var(--dark);
          color: white;
        }

        .button-lime {
          background: var(--neon);
          color: var(--dark);
        }

        .button-dark:hover,
        .button-lime:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 rgba(57, 52, 36, 0.15);
        }

        .arrow {
          font-size: 17px;
          line-height: 1;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #628047;
        }

        .eyebrow-dot {
          flex: 0 0 auto;
          width: 8px;
          height: 8px;
          background: var(--leaf);
          border-radius: 50%;
          box-shadow: 0 0 0 5px rgba(98, 171, 55, 0.13);
        }

        /* HERO AND LAYERED SHOWCASE */

        .hero {
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          gap: 20px;
          align-items: center;
          min-height: 760px;
          padding: 48px 0 70px 5%;
          background: #e7eee0;
          position: relative;
          isolation: isolate;
        }

        .hero::before {
          content: "";
          position: absolute;
          z-index: -2;
          width: 90%;
          height: 150%;
          top: -56%;
          right: -21%;
          border-radius: 50%;
          background: var(--dark);
          transform: rotate(-13deg);
        }

        .hero::after {
          content: "";
          position: absolute;
          z-index: -1;
          width: 87%;
          height: 74%;
          right: -16%;
          bottom: -44%;
          border-radius: 50%;
          background: var(--leaf);
          transform: rotate(-13deg);
        }

        .hero-copy {
          max-width: 550px;
          position: relative;
          z-index: 6;
          padding: 25px 0;
        }

        .hero h1 {
          margin: 25px 0 22px;
          font: 800 clamp(53px, 6vw, 83px)/0.99 "Manrope", sans-serif;
          letter-spacing: -4.5px;
          text-transform: uppercase;
        }

        .hero h1 span {
          display: block;
        }

        .hero h1 .green {
          color: #558a35;
        }

        .hero h1 .serif {
          font: italic 500 1.08em/1.02 "Playfair Display", serif;
          text-transform: none;
          letter-spacing: -4px;
        }

        .hero-description {
          max-width: 410px;
          color: #747766;
          font-size: 14px;
          line-height: 1.9;
          margin: 0 0 26px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .text-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 0;
          border-bottom: 1px solid #a5aa92;
          font-size: 12px;
          font-weight: 800;
        }

        .text-link:hover {
          color: var(--leaf);
        }

        .hero-points {
          display: grid;
          gap: 14px;
          margin-top: 39px;
        }

        .hero-point {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 13px;
        }

        .point-icon {
          width: 33px;
          height: 33px;
          display: grid;
          place-items: center;
          border: 1px solid #91a783;
          color: #4d803a;
          font-size: 16px;
        }

        .hero-point strong {
          font-weight: 700;
        }

        .showcase {
          position: relative;
          min-width: 0;
          height: 680px;
          perspective: 1400px;
        }

        .preview {
          position: absolute;
          background: var(--white);
          border: 1px solid rgba(57, 52, 36, 0.13);
          border-radius: 7px;
          overflow: hidden;
          box-shadow:
            0 25px 50px rgba(15, 24, 13, 0.23),
            0 4px 10px rgba(15, 24, 13, 0.08);
        }

        .preview-left {
          z-index: 1;
          width: 56%;
          height: 460px;
          left: -5%;
          bottom: 9px;
          transform: rotateY(7deg) rotateZ(-2deg);
        }

        .preview-right {
          z-index: 2;
          width: 54%;
          height: 470px;
          right: -10%;
          top: 97px;
          transform: rotateY(-8deg) rotateZ(2deg);
        }

        .preview-main {
          z-index: 4;
          width: 67%;
          height: 585px;
          left: 19%;
          top: 25px;
          transform: rotateY(-2deg) rotateZ(0.5deg);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .showcase:hover .preview-main {
          transform: translateY(-5px) rotateY(0) rotateZ(0);
          box-shadow: 0 35px 65px rgba(15, 24, 13, 0.3);
        }

        .browser-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 7px;
          height: 35px;
          padding: 0 10px;
          background: #fffefb;
          border-bottom: 1px solid #e9eae1;
        }

        .browser-dots {
          display: flex;
          gap: 4px;
        }

        .browser-dots span {
          width: 5px;
          height: 5px;
          background: #c7d7bd;
          border-radius: 50%;
        }

        .mini-brand {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--dark);
          font-size: 7px;
          font-weight: 800;
          white-space: nowrap;
        }

        .mini-brand-symbol {
          width: 14px;
          height: 14px;
          display: grid;
          place-items: center;
          background: var(--leaf);
          border-radius: 4px 4px 4px 1px;
          color: white;
          font-size: 9px;
        }

        .mini-nav {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 6px;
          color: #606252;
          white-space: nowrap;
        }

        .mini-pill {
          background: var(--leaf);
          color: white;
          border-radius: 20px;
          font-size: 6px;
          font-weight: 800;
          padding: 6px 8px;
          white-space: nowrap;
        }

        .mock-hero {
          display: grid;
          grid-template-columns: 1.12fr 0.88fr;
          gap: 7px;
          align-items: center;
          position: relative;
          min-height: 176px;
          padding: 19px 16px;
          overflow: hidden;
          background: #315d38;
          color: white;
        }

        .mock-hero::after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          border: 1px solid rgba(166, 235, 201, 0.24);
          border-radius: 50%;
          right: -85px;
          bottom: -165px;
          box-shadow: 0 0 0 18px rgba(166, 235, 201, 0.035);
        }

        .mock-label {
          display: block;
          color: var(--mint);
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .mock-hero h2 {
          font: 700 19px/1.15 "Manrope", sans-serif;
          letter-spacing: -0.6px;
          margin: 11px 0 8px;
          position: relative;
          z-index: 1;
        }

        .mock-hero p {
          font-size: 7px;
          line-height: 1.7;
          color: #d4e3ce;
          max-width: 150px;
          margin: 0 0 10px;
        }

        .plant-art {
          display: grid;
          place-items: center;
          position: relative;
          z-index: 1;
        }

        .plant-circle {
          width: 100px;
          height: 100px;
          display: grid;
          place-items: center;
          position: relative;
          border-radius: 50%;
          background: var(--mint);
          color: #467a38;
          font-size: 48px;
        }

        .plant-circle::after {
          content: "";
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(57, 52, 36, 0.17);
          border-radius: 50%;
        }

        .mock-content {
          padding: 16px 17px;
        }

        .mock-heading-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 11px;
        }

        .mock-heading {
          font: 700 10px "Manrope", sans-serif;
        }

        .mock-subheading {
          margin-top: 4px;
          color: #858775;
          font-size: 6px;
        }

        .mock-progress {
          width: 67px;
          height: 5px;
          border-radius: 20px;
          background: #e5e9dd;
          overflow: hidden;
        }

        .mock-progress span {
          display: block;
          width: 40%;
          height: 100%;
          background: var(--leaf);
        }

        .mock-habit {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 0;
          border-bottom: 1px solid #eceee5;
        }

        .mock-check {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
          border: 1px solid #c2cbb8;
          border-radius: 4px;
        }

        .mock-check.done {
          display: grid;
          place-items: center;
          background: var(--leaf);
          border-color: var(--leaf);
          color: white;
          font-size: 9px;
        }

        .mock-habit-name {
          flex: 1;
          font-size: 7px;
          font-weight: 700;
        }

        .mock-time {
          font-size: 6px;
          color: #858775;
        }

        .mock-stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
          margin-top: 14px;
        }

        .mock-stat {
          background: #edf3e5;
          border-radius: 4px;
          padding: 10px;
          min-height: 68px;
        }

        .mock-stat.dark {
          color: white;
          background: var(--dark);
        }

        .mock-stat small,
        .mock-stat span {
          display: block;
          font-size: 6px;
          opacity: 0.75;
        }

        .mock-stat strong {
          display: block;
          font: 700 17px "Manrope", sans-serif;
          margin: 6px 0 2px;
        }

        .mock-chart {
          margin-top: 12px;
          padding: 11px;
          background: #f0f1e9;
        }

        .mock-chart-title {
          margin-bottom: 8px;
          font-size: 8px;
          font-weight: 800;
        }

        .chart-bars {
          height: 33px;
          display: flex;
          align-items: end;
          gap: 6px;
        }

        .chart-bars span {
          flex: 1;
          min-width: 3px;
          background: #91bf7c;
          border-radius: 3px 3px 0 0;
        }

        .back-dark {
          padding: 18px 14px;
          min-height: 137px;
          color: white;
          background: linear-gradient(135deg, #393424, #29472c);
          position: relative;
          overflow: hidden;
        }

        .back-dark::after {
          content: "✳";
          position: absolute;
          right: -10px;
          bottom: -42px;
          font-size: 120px;
          color: rgba(166, 235, 201, 0.18);
        }

        .back-dark h3 {
          max-width: 200px;
          position: relative;
          z-index: 1;
          font: 500 23px/1.1 "Playfair Display", serif;
          margin: 10px 0;
        }

        .back-dark p {
          max-width: 155px;
          font-size: 7px;
          line-height: 1.7;
          color: #d5e0cf;
        }

        .back-list {
          padding: 13px;
        }

        .back-list-row {
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #eceee5;
          padding: 10px 0;
          font-size: 7px;
        }

        .back-list-row b {
          color: var(--leaf);
          font-size: 10px;
        }

        .side-hero {
          background: var(--leaf);
          position: relative;
          min-height: 135px;
          color: white;
          padding: 20px 14px;
        }

        .side-hero h3 {
          max-width: 130px;
          font: 700 18px/1.15 "Manrope", sans-serif;
          margin: 9px 0;
        }

        .side-hero p {
          max-width: 115px;
          font-size: 7px;
          line-height: 1.6;
        }

        .side-art {
          position: absolute;
          right: 10px;
          top: 24px;
          width: 76px;
          height: 92px;
          display: grid;
          place-items: center;
          border-radius: 50% 50% 4px 4px;
          border: 4px solid rgba(255, 255, 255, 0.6);
          background: linear-gradient(150deg, #a6ebc9, #b9cf90 50%, #393424);
          color: #3b6634;
          font-size: 36px;
        }

        .side-cards {
          padding: 14px;
        }

        .side-cards-title {
          font-size: 9px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .side-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .side-card {
          background: #eff1e7;
          padding: 8px;
          min-height: 90px;
        }

        .side-card-art {
          height: 34px;
          display: grid;
          place-items: center;
          margin-bottom: 7px;
          background: #d5e5ca;
          color: #567e42;
          font-size: 18px;
        }

        .side-card strong {
          font-size: 7px;
          display: block;
        }

        .side-card span {
          display: block;
          margin-top: 5px;
          color: #858775;
          font-size: 6px;
        }

        .floating-label {
          position: absolute;
          z-index: 7;
          left: 6%;
          bottom: 4px;
          padding: 17px 21px;
          background: var(--neon);
          box-shadow: 7px 9px 0 rgba(20, 32, 16, 0.2);
          transform: rotate(-3deg);
          font-size: 11px;
          font-weight: 800;
        }

        .floating-label small {
          display: block;
          margin-top: 5px;
          font-size: 8px;
          font-weight: 600;
        }

        .showcase-note {
          position: absolute;
          right: 8%;
          bottom: -23px;
          z-index: 7;
          color: white;
          font: italic 500 19px "Playfair Display", serif;
          transform: rotate(-4deg);
        }

        /* BENEFIT STRIP */

        .benefit-strip {
          background: var(--dark);
          color: white;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 24px 5%;
        }

        .benefit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 5px 15px;
          border-right: 1px solid rgba(255, 255, 255, 0.16);
        }

        .benefit:last-child {
          border-right: 0;
        }

        .benefit-icon {
          color: var(--neon);
          font-size: 22px;
        }

        .benefit strong {
          display: block;
          font-size: 11px;
        }

        .benefit span:last-child {
          display: block;
          color: #c5c5b7;
          margin-top: 4px;
          font-size: 9px;
        }

        /* SHARED SECTION HEADING */

        .section {
          padding: 100px 5%;
        }

        .section-inner {
          width: min(1100px, 100%);
          margin: 0 auto;
        }

        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 35px;
          margin-bottom: 38px;
        }

        .section-head h2 {
          font: 500 clamp(38px, 4.6vw, 58px)/1.06 "Playfair Display", serif;
          letter-spacing: -1.8px;
          margin: 17px 0 0;
        }

        .section-head h2 em {
          color: var(--leaf);
        }

        .section-head > p {
          max-width: 330px;
          margin: 0 0 5px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.9;
        }

        /* INTERACTIVE PLANNER */

        .planner-section {
          background: var(--paper);
        }

        .planner-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.75fr;
          gap: 19px;
          align-items: stretch;
        }

        .planner-card {
          padding: 28px;
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 5px;
          box-shadow: 0 20px 50px rgba(57, 52, 36, 0.07);
        }

        .planner-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          border-bottom: 1px solid #e8eadf;
          padding-bottom: 21px;
        }

        .planner-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .day-square {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: var(--mint);
          border-radius: 4px;
          font: 800 19px "Manrope", sans-serif;
        }

        .planner-header h3 {
          margin: 0 0 5px;
          font-size: 13px;
        }

        .planner-header p {
          margin: 0;
          color: var(--muted);
          font-size: 10px;
        }

        .today-badge {
          border-radius: 20px;
          padding: 8px 11px;
          color: #477a31;
          background: #e9f2e2;
          font-size: 9px;
          font-weight: 800;
        }

        .completion-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 21px 0 10px;
          font-size: 11px;
        }

        .completion-row strong {
          font-size: 12px;
        }

        .progress-track {
          height: 6px;
          background: #e5e9dc;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--leaf), var(--neon));
          border-radius: inherit;
          transition: width 0.3s ease;
        }

        .habit-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 17px 0;
          border-bottom: 1px solid #eceee5;
        }

        .habit-row:last-of-type {
          border-bottom: 0;
        }

        .habit-check {
          width: 25px;
          height: 25px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 1px solid #c6ceb9;
          border-radius: 50%;
          background: transparent;
          color: white;
          font-size: 13px;
          transition: background 0.2s ease;
        }

        .habit-check.done {
          background: var(--leaf);
          border-color: var(--leaf);
        }

        .habit-copy {
          min-width: 0;
          flex: 1;
        }

        .habit-copy strong {
          display: block;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .habit-copy span {
          display: block;
          font-size: 10px;
          color: var(--muted);
        }

        .habit-row.completed .habit-copy strong {
          color: #8b8d7e;
          text-decoration: line-through;
        }

        .habit-time {
          font-size: 10px;
          color: var(--muted);
          white-space: nowrap;
        }

        .planner-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 13px;
          padding-top: 17px;
          margin-top: 4px;
          border-top: 1px solid #e8eadf;
          font-size: 10px;
          color: var(--muted);
        }

        .reset-button {
          color: #56843a;
          background: transparent;
          border: 0;
          font-size: 10px;
          font-weight: 800;
        }

        .reset-button:hover {
          text-decoration: underline;
        }

        .planner-aside {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 430px;
          overflow: hidden;
          position: relative;
          padding: 30px;
          color: white;
          background: var(--dark);
          border-radius: 5px;
        }

        .planner-aside::after {
          content: "";
          position: absolute;
          width: 250px;
          height: 250px;
          right: -95px;
          bottom: 75px;
          border-radius: 50%;
          border: 1px solid rgba(166, 235, 201, 0.25);
          box-shadow: 0 0 0 25px rgba(166, 235, 201, 0.03);
        }

        .aside-label {
          color: var(--mint);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.7px;
          text-transform: uppercase;
        }

        .planner-aside h3 {
          font: 500 31px/1.15 "Playfair Display", serif;
          margin: 17px 0 13px;
          position: relative;
          z-index: 1;
        }

        .planner-aside p {
          color: #c8c9b9;
          font-size: 12px;
          line-height: 1.9;
          position: relative;
          z-index: 1;
        }

        .aside-symbol {
          align-self: flex-end;
          color: var(--neon);
          font-size: 88px;
          line-height: 1;
          transform: rotate(-13deg);
          text-shadow: 7px 8px 0 rgba(166, 235, 201, 0.1);
          position: relative;
          z-index: 1;
        }

        .aside-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.18);
          padding-top: 16px;
          margin-top: 18px;
          color: #cdcebf;
          font-size: 10px;
          position: relative;
          z-index: 1;
        }

        /* MOOD CHECK-IN AND JOURNAL */

        .mood-section {
          background: #315d38;
          color: white;
          padding: 105px 5%;
          position: relative;
          overflow: hidden;
        }

        .mood-section::after {
          content: "✳";
          position: absolute;
          top: -155px;
          right: -75px;
          font-size: 450px;
          color: rgba(166, 235, 201, 0.06);
          pointer-events: none;
        }

        .mood-inner {
          width: min(1100px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 0.85fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .mood-copy h2 {
          font: 500 clamp(42px, 5vw, 64px)/1.05 "Playfair Display", serif;
          letter-spacing: -2px;
          margin: 20px 0;
        }

        .mood-copy h2 em {
          color: var(--neon);
        }

        .mood-copy > p {
          max-width: 420px;
          color: #d0dfc9;
          font-size: 13px;
          line-height: 1.9;
        }

        .mood-options {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-top: 25px;
        }

        .mood-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-width: 0;
          padding: 13px 3px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.06);
          color: white;
          transition: 0.2s ease;
        }

        .mood-option:hover {
          transform: translateY(-3px);
        }

        .mood-option.selected {
          color: var(--dark);
          border-color: var(--neon);
          background: var(--neon);
          box-shadow: 0 5px 0 rgba(0, 0, 0, 0.13);
        }

        .mood-emoji {
          font-size: 23px;
        }

        .mood-option strong {
          font-size: 10px;
        }

        .mood-option small {
          font-size: 7px;
          text-align: center;
        }

        .mood-feedback {
          min-height: 38px;
          color: var(--mint) !important;
          margin-top: 20px !important;
          font-size: 12px !important;
        }

        .journal-card {
          padding: 29px;
          color: var(--dark);
          background: var(--paper);
          border-radius: 5px;
          box-shadow: 12px 15px 0 rgba(21, 36, 19, 0.22);
          transform: rotate(1deg);
        }

        .journal-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 19px;
        }

        .journal-icon {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          background: var(--neon);
          border-radius: 5px;
          font-size: 23px;
        }

        .journal-label {
          color: #607d49;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .journal-card h3 {
          font: 500 29px/1.15 "Playfair Display", serif;
          margin: 0 0 10px;
        }

        .journal-card > p {
          font-size: 11px;
          line-height: 1.8;
          color: #777968;
        }

        .journal-card label {
          display: block;
          margin: 21px 0 10px;
        }

        .journal-card textarea {
          display: block;
          width: 100%;
          min-height: 125px;
          resize: vertical;
          padding: 13px;
          border: 1px solid #dcdfd0;
          border-radius: 4px;
          background: #fffefb;
          color: var(--dark);
          font: 12px/1.8 "DM Sans", sans-serif;
        }

        .journal-card textarea:focus {
          outline: 2px solid var(--leaf);
        }

        .journal-bottom {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 8px;
          color: #858775;
          font-size: 9px;
        }

        .journal-prompt {
          padding: 13px;
          margin-top: 22px;
          background: #e7eee0;
          border-left: 3px solid var(--leaf);
        }

        .journal-prompt span {
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #58833b;
        }

        .journal-prompt p {
          font: italic 500 15px/1.5 "Playfair Display", serif;
          margin: 8px 0 0;
        }

        .save-journal {
          width: 100%;
          border: 0;
          padding: 12px;
          margin-top: 13px;
          border-radius: 4px;
          background: var(--dark);
          color: white;
          font-size: 11px;
          font-weight: 800;
          transition: background 0.2s ease;
        }

        .save-journal:hover {
          background: #4f7c34;
        }

        .saved-note {
          margin-top: 10px;
          color: #528137;
          font-size: 10px;
          line-height: 1.6;
        }

        /* WELLNESS LIBRARY */

        .library-section {
          background: #eff1e7;
        }

        .library-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 17px;
          margin-top: 38px;
        }

        .library-card {
          min-height: 355px;
          padding: 25px;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: 0 5px 0 rgba(57, 52, 36, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .library-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 27px rgba(57, 52, 36, 0.11);
        }

        .library-card.sleep {
          background: #dce8d3;
        }

        .library-card.mind {
          background: #d0e7cf;
        }

        .library-card.move {
          background: var(--mint);
        }

        .library-top {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #5a7748;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .library-symbol {
          width: 54px;
          height: 54px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.58);
          color: #50813d;
          font-size: 27px;
          box-shadow: 0 5px 13px rgba(57, 52, 36, 0.06);
        }

        .library-card h3 {
          font: 500 28px/1.15 "Playfair Display", serif;
          letter-spacing: -0.4px;
          margin: 25px 0 12px;
        }

        .library-card > p {
          margin: 0 0 21px;
          color: #6c7261;
          font-size: 12px;
          line-height: 1.9;
        }

        .library-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .library-tags span {
          padding: 7px 9px;
          border: 1px solid rgba(57, 52, 36, 0.15);
          border-radius: 30px;
          color: #5c674e;
          font-size: 9px;
        }

        .library-link {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding: 25px 0 9px;
          border-bottom: 1px solid rgba(57, 52, 36, 0.2);
          font-size: 11px;
          font-weight: 800;
        }

        .library-link span {
          font-size: 17px;
          transition: transform 0.2s ease;
        }

        .library-link:hover span {
          transform: translate(3px, -3px);
        }

        /* WEEKLY RESET */

        .weekly-section {
          padding: 105px 5%;
          background: var(--dark);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .weekly-section::before {
          content: "";
          position: absolute;
          width: 570px;
          height: 570px;
          right: -240px;
          top: -240px;
          border-radius: 50%;
          border: 1px solid rgba(166, 235, 201, 0.15);
          box-shadow: 0 0 0 30px rgba(166, 235, 201, 0.025);
        }

        .weekly-inner {
          width: min(1100px, 100%);
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 60px;
          align-items: center;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .weekly-copy h2 {
          font: 500 clamp(42px, 5vw, 62px)/1.07 "Playfair Display", serif;
          letter-spacing: -2px;
          margin: 21px 0;
        }

        .weekly-copy h2 em {
          color: var(--neon);
        }

        .weekly-copy > p {
          max-width: 390px;
          margin-bottom: 28px;
          color: #c5c5b5;
          font-size: 13px;
          line-height: 1.9;
        }

        .weekly-board {
          padding: 27px;
          background: var(--white);
          color: var(--dark);
          border-radius: 5px;
          box-shadow: 12px 15px 0 rgba(0, 0, 0, 0.15);
          transform: rotate(-1deg);
        }

        .weekly-board-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding-bottom: 19px;
          border-bottom: 1px solid #e6e9dd;
        }

        .weekly-label {
          color: #608745;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .weekly-board-head h3 {
          font: 500 24px "Playfair Display", serif;
          margin: 9px 0 0;
        }

        .weekly-spark {
          width: 42px;
          height: 42px;
          display: grid;
          flex-shrink: 0;
          place-items: center;
          background: var(--neon);
          border-radius: 50%;
          font-size: 22px;
        }

        .weekly-row {
          display: grid;
          grid-template-columns: 43px 1fr 22px;
          align-items: center;
          gap: 13px;
          padding: 17px 0;
          border-bottom: 1px solid #eceee5;
        }

        .weekly-day {
          width: 41px;
          height: 41px;
          display: grid;
          place-items: center;
          border-radius: 4px;
          background: #e7eee0;
          color: #557b3d;
          font-size: 9px;
          font-weight: 800;
        }

        .weekly-row-copy strong {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
        }

        .weekly-row-copy span {
          display: block;
          color: #828474;
          font-size: 10px;
          line-height: 1.5;
        }

        .weekly-number {
          color: #8ca17d;
          text-align: right;
          font: 500 11px "Manrope", sans-serif;
        }

        .weekly-footer {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 18px;
          color: #777968;
          font-size: 9px;
        }

        /* CLOSING AND FOOTER */

        .closing {
          padding: 82px 5%;
          color: white;
          background: #315d38;
          position: relative;
          overflow: hidden;
        }

        .closing::after {
          content: "✳";
          position: absolute;
          right: -35px;
          bottom: -190px;
          color: rgba(166, 235, 201, 0.1);
          font-size: 370px;
          line-height: 1;
          pointer-events: none;
        }

        .closing-inner {
          width: min(1100px, 100%);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 35px;
          position: relative;
          z-index: 1;
        }

        .closing h2 {
          font: 500 clamp(39px, 4.7vw, 57px)/1.08 "Playfair Display", serif;
          letter-spacing: -1.7px;
          margin: 18px 0 0;
        }

        .closing h2 em {
          color: var(--neon);
        }

        .footer {
          padding: 24px 5%;
          background: #29261d;
          color: #c3c4b3;
        }

        .footer-inner {
          width: min(1100px, 100%);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          font-size: 10px;
        }

        .footer .logo {
          color: white;
          font-size: 17px;
        }

        .footer .logo-symbol {
          width: 29px;
          height: 29px;
          font-size: 17px;
          box-shadow: none;
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        /* RESPONSIVE */

        @media (min-width: 1500px) {
          .hero {
            min-height: 850px;
          }

          .showcase {
            height: 750px;
          }

          .preview-main {
            height: 645px;
          }

          .preview-left,
          .preview-right {
            height: 500px;
          }
        }

        @media (max-width: 1050px) {
          .hero {
            grid-template-columns: 0.82fr 1.18fr;
            gap: 0;
          }

          .hero h1 {
            font-size: clamp(48px, 5.8vw, 66px);
            letter-spacing: -3.5px;
          }

          .showcase {
            transform: scale(0.94);
            transform-origin: center left;
          }

          .preview-main {
            width: 70%;
            left: 16%;
          }

          .nav-links {
            gap: 16px;
          }

          .planner-card {
            padding: 22px;
          }

          .planner-aside {
            padding: 24px;
          }

          .mood-inner,
          .weekly-inner {
            gap: 35px;
          }
        }

        @media (max-width: 760px) {
          .navbar {
            height: 72px;
            padding: 0 22px;
          }

          .logo {
            font-size: 21px;
          }

          .nav-links {
            display: none;
          }

          .nav-button {
            margin-left: auto;
            padding: 12px 14px;
            font-size: 10px;
          }

          .hero {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 5px;
            min-height: auto;
            padding: 45px 22px 55px;
          }

          .hero::before {
            width: 135%;
            height: 78%;
            right: -46%;
            top: 44%;
          }

          .hero::after {
            width: 120%;
            height: 55%;
            right: -55%;
            bottom: -30%;
          }

          .hero-copy {
            padding: 5px 0 20px;
            max-width: 100%;
          }

          .hero h1 {
            font-size: clamp(52px, 10.5vw, 76px);
            letter-spacing: -3.8px;
          }

          .hero-description {
            font-size: 13px;
          }

          .hero-points {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 13px;
            margin-top: 30px;
          }

          .hero-point {
            gap: 9px;
            font-size: 11px;
          }

          .point-icon {
            width: 29px;
            height: 29px;
          }

          .showcase {
            width: 100%;
            height: 530px;
            margin-top: 10px;
            transform: none;
          }

          .preview-main {
            width: 67%;
            height: 470px;
            left: 16%;
            top: 20px;
          }

          .preview-left {
            width: 52%;
            height: 355px;
            left: -2%;
            bottom: 12px;
          }

          .preview-right {
            width: 48%;
            height: 370px;
            right: -5%;
            top: 90px;
          }

          .mock-hero {
            min-height: 153px;
            padding: 13px 9px;
          }

          .mock-hero h2 {
            font-size: 15px;
          }

          .mock-hero p {
            font-size: 6px;
          }

          .plant-circle {
            width: 75px;
            height: 75px;
            font-size: 36px;
          }

          .mock-content {
            padding: 12px 10px;
          }

          .mini-nav {
            gap: 6px;
            font-size: 5px;
          }

          .preview-left .mini-nav,
          .preview-right .mini-nav {
            display: none;
          }

          .floating-label {
            left: 3%;
            bottom: 0;
            padding: 12px 15px;
            font-size: 9px;
          }

          .floating-label small {
            font-size: 7px;
          }

          .showcase-note {
            right: 0;
            bottom: -20px;
            font-size: 15px;
          }

          .benefit-strip {
            gap: 12px;
            padding: 23px 20px;
          }

          .benefit {
            justify-content: flex-start;
            gap: 8px;
            padding: 4px 6px;
          }

          .benefit strong {
            font-size: 9px;
          }

          .benefit span:last-child {
            font-size: 8px;
          }

          .section {
            padding: 75px 22px;
          }

          .section-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
          }

          .planner-grid {
            grid-template-columns: 1fr;
          }

          .planner-aside {
            min-height: 330px;
          }

          .mood-inner,
          .weekly-inner {
            grid-template-columns: 1fr;
            gap: 34px;
          }

          .mood-section,
          .weekly-section {
            padding: 76px 22px;
          }

          .journal-card {
            transform: none;
          }

          .library-grid {
            grid-template-columns: 1fr;
          }

          .library-card {
            min-height: 310px;
          }

          .weekly-board {
            transform: none;
          }

          .closing-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-inner {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 0 16px;
          }

          .logo {
            font-size: 19px;
          }

          .nav-button {
            gap: 8px;
            padding: 11px;
          }

          .hero {
            padding: 38px 17px 44px;
          }

          .hero h1 {
            font-size: clamp(45px, 11.8vw, 57px);
            letter-spacing: -2.8px;
          }

          .hero-actions {
            gap: 13px;
          }

          .hero-actions .button-dark {
            padding: 13px;
            font-size: 10px;
          }

          .text-link {
            font-size: 10px;
          }

          .hero-points {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .showcase {
            height: 420px;
          }

          .preview-main {
            width: 73%;
            height: 380px;
            left: 12%;
            top: 17px;
          }

          .preview-left {
            width: 50%;
            height: 280px;
            left: -7%;
            bottom: 0;
          }

          .preview-right {
            width: 46%;
            height: 295px;
            right: -9%;
            top: 72px;
          }

          .browser-bar {
            height: 28px;
            padding: 0 6px;
          }

          .mini-brand {
            font-size: 6px;
          }

          .mini-brand-symbol {
            width: 11px;
            height: 11px;
            font-size: 7px;
          }

          .mini-nav {
            display: none;
          }

          .mini-pill {
            padding: 4px 5px;
            font-size: 5px;
          }

          .mock-hero {
            min-height: 125px;
            padding: 10px 7px;
          }

          .mock-label {
            font-size: 5px;
          }

          .mock-hero h2 {
            font-size: 12px;
            margin: 7px 0;
          }

          .mock-hero p {
            font-size: 5px;
          }

          .plant-circle {
            width: 60px;
            height: 60px;
            font-size: 30px;
          }

          .mock-content {
            padding: 9px 7px;
          }

          .mock-heading {
            font-size: 7px;
          }

          .mock-subheading {
            font-size: 5px;
          }

          .mock-progress {
            width: 40px;
          }

          .mock-habit {
            gap: 4px;
            padding: 6px 0;
          }

          .mock-check {
            width: 11px;
            height: 11px;
          }

          .mock-habit-name {
            font-size: 5px;
          }

          .mock-time {
            font-size: 4px;
          }

          .mock-stat-grid {
            gap: 4px;
            margin-top: 8px;
          }

          .mock-stat {
            min-height: 48px;
            padding: 6px;
          }

          .mock-stat strong {
            font-size: 13px;
          }

          .mock-stat small,
          .mock-stat span {
            font-size: 5px;
          }

          .mock-chart {
            padding: 7px;
            margin-top: 8px;
          }

          .mock-chart-title {
            font-size: 6px;
            margin-bottom: 5px;
          }

          .chart-bars {
            height: 23px;
          }

          .floating-label {
            left: 0;
            bottom: -3px;
            padding: 10px 12px;
          }

          .showcase-note {
            font-size: 12px;
          }

          .benefit-strip {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 17px 22px;
          }

          .benefit {
            padding: 12px 0;
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          }

          .benefit:last-child {
            border-bottom: 0;
          }

          .section {
            padding: 63px 17px;
          }

          .section-head h2 {
            font-size: 41px;
          }

          .planner-card {
            padding: 16px 13px;
          }

          .planner-header p {
            max-width: 175px;
            line-height: 1.5;
          }

          .day-square {
            height: 38px;
            width: 38px;
          }

          .habit-row {
            gap: 9px;
            padding: 14px 0;
          }

          .habit-copy strong {
            font-size: 11px;
          }

          .habit-copy span,
          .habit-time {
            font-size: 9px;
          }

          .planner-aside {
            padding: 24px;
          }

          .mood-section,
          .weekly-section {
            padding: 64px 17px;
          }

          .mood-options {
            gap: 5px;
          }

          .mood-option {
            padding: 11px 2px;
          }

          .mood-option strong {
            font-size: 9px;
          }

          .mood-option small {
            font-size: 6px;
          }

          .journal-card {
            padding: 20px;
          }

          .journal-card h3 {
            font-size: 26px;
          }

          .weekly-board {
            padding: 17px;
          }

          .weekly-board-head h3 {
            font-size: 20px;
          }

          .weekly-row {
            grid-template-columns: 35px minmax(0, 1fr) 18px;
            gap: 9px;
            padding: 14px 0;
          }

          .weekly-day {
            width: 34px;
            height: 34px;
            font-size: 8px;
          }

          .weekly-row-copy strong {
            font-size: 10px;
          }

          .weekly-row-copy span {
            font-size: 9px;
          }

          .weekly-number {
            font-size: 9px;
          }

          .closing {
            padding: 62px 22px;
          }

          .closing h2 {
            font-size: 41px;
          }

          .footer {
            padding: 22px;
          }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-links {
            gap: 15px;
            flex-wrap: wrap;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section className="benefit-strip">
        <div className="benefit">
          <span className="benefit-icon">✳</span>
          <div>
            <strong>Mindful by design</strong>
            <span>Less noise. More intention.</span>
          </div>
        </div>
        <div className="benefit">
          <span className="benefit-icon">↗</span>
          <div>
            <strong>Progress that matters</strong>
            <span>Celebrate little wins.</span>
          </div>
        </div>
        <div className="benefit">
          <span className="benefit-icon">♡</span>
          <div>
            <strong>Your life, your rhythm</strong>
            <span>No perfect-day pressure.</span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PLANNER */}

      <section className="section planner-section" id="planner">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> YOUR PERSONAL SPACE
              </div>
              <h2>
                Make today
                <br />
                <em>feel a little better.</em>
              </h2>
            </div>
            <p>
              Pick a few realistic habits, check them off as you complete them,
              and watch your daily progress change.
            </p>
          </div>

          <div className="planner-grid">
            <div className="planner-card">
              <div className="planner-header">
                <div className="planner-header-left">
                  <div className="day-square">✳</div>
                  <div>
                    <h3>Your daily reset</h3>
                    <p>A few small things, just for you.</p>
                  </div>
                </div>
                <span className="today-badge">MY DAY</span>
              </div>

              <div className="completion-row">
                <strong>Your little wins</strong>
                <span>{completed.length} of {habits.length} complete</span>
              </div>

              <div
                className="progress-track"
                aria-label={`${progress}% completed`}
              >
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>

              {habits.map((habit, index) => {
                const done = completed.includes(index);

                return (
                  <div className={`habit-row ${done ? "completed" : ""}`} key={habit.title}>
                    <button
                      type="button"
                      className={`habit-check ${done ? "done" : ""}`}
                      onClick={() => toggleHabit(index)}
                      aria-label={`${done ? "Uncheck" : "Complete"} ${habit.title}`}
                    >
                      {done ? "✓" : ""}
                    </button>
                    <div className="habit-copy">
                      <strong>{habit.title}</strong>
                      <span>{habit.detail}</span>
                    </div>
                    <span className="habit-time">{habit.time}</span>
                  </div>
                );
              })}

              <div className="planner-footer">
                <span>
                  {completed.length === habits.length
                    ? "You did it. Take a breath. ✳"
                    : "Every small step counts."}
                </span>
                <button className="reset-button" onClick={() => setCompleted([])}>
                  Reset ↺
                </button>
              </div>
            </div>

            <aside className="planner-aside">
              <div>
                <span className="aside-label">A GENTLE REMINDER</span>
                <h3>
                  You are allowed
                  <br />
                  to go slowly.
                </h3>
                <p>
                  Your routine should support your life, not become another
                  deadline. Progress comes in many forms.
                </p>
              </div>
              <div className="aside-symbol">✳</div>
              <div className="aside-footer">
                 Today&apos;s progress: <strong>{progress}%</strong>
                <br />
                No pressure. Just progress.
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* MOOD CHECK-IN AND JOURNAL */}

      <section className="mood-section" id="checkin">
        <div className="mood-inner">
          <div className="mood-copy">
            <div className="eyebrow" style={{ color: "var(--mint)" }}>
              <span className="eyebrow-dot" /> TAKE A MOMENT FOR YOU
            </div>

            <h2>
              How are you,
              <br />
              <em>really?</em>
            </h2>

            <p>
               You don&apos;t need to have everything figured out. Pause for a moment,
              notice how you feel, and meet yourself where you are.
            </p>

            <div className="mood-options">
              {[
                { name: "Low", emoji: "☁", description: "Taking it slow" },
                { name: "Okay", emoji: "◒", description: "Getting through" },
                { name: "Good", emoji: "☼", description: "Feeling balanced" },
                { name: "Great", emoji: "✳", description: "Full of energy" },
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className={`mood-option ${mood === item.name ? "selected" : ""}`}
                  onClick={() => setMood(item.name)}
                  aria-pressed={mood === item.name}
                >
                  <span className="mood-emoji">{item.emoji}</span>
                  <strong>{item.name}</strong>
                  <small>{item.description}</small>
                </button>
              ))}
            </div>

            <p className="mood-feedback">
              {mood === "Low"
                ? "It's okay to take things one breath at a time."
                : mood === "Okay"
                  ? "You don't need to feel amazing every single day."
                  : mood === "Good"
                    ? "Notice what's helping you feel balanced today."
                    : "Enjoy the good moments without needing to earn them."}
            </p>
          </div>

          <div className="journal-card">
            <div className="journal-top">
              <span className="journal-icon">✎</span>
              <span className="journal-label">YOUR PERSONAL JOURNAL</span>
            </div>

            <h3>A little space to let it out.</h3>
            <p>
               What&apos;s on your mind today? Write a little, reflect, or just let
              your thoughts land somewhere.
            </p>

            <label className="journal-label" htmlFor="daily-journal">
               TODAY&apos;S REFLECTION
            </label>

            <textarea
              id="daily-journal"
              value={journal}
              onChange={(event) => {
                setJournal(event.target.value);
                setSavedReflection("");
              }}
              placeholder="Today, I'm feeling..."
              maxLength={600}
              rows={5}
            />

            <div className="journal-bottom">
              <span>{journal.length}/600 characters</span>
              <span>Just for you ♡</span>
            </div>

            <button
              className="save-journal"
              type="button"
              onClick={() => setSavedReflection(journal.trim())}
              disabled={!journal.trim()}
            >
              Save reflection
            </button>

            {savedReflection && (
              <p className="saved-note" role="status">
                Your reflection is saved in this page for now. Refreshing the
                page will clear it.
              </p>
            )}

            <div className="journal-prompt">
              <span>✳ TRY THIS PROMPT</span>
               <p>What&apos;s one thing I can do today to be kinder to myself?</p>
            </div>
          </div>
        </div>
      </section>

      {/* WELLNESS LIBRARY */}

      <section className="section library-section" id="library">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> YOUR WELLNESS LIBRARY
              </div>
              <h2>
                Find what feels
                <br />
                <em>good for you.</em>
              </h2>
            </div>
            <p>
              Different days call for different things. Explore simple rituals
              and choose what fits your life right now.
            </p>
          </div>

          <div className="library-grid">
            {library.map((item) => (
              <article className={`library-card ${item.style}`} key={item.title}>
                <div className="library-top">
                  <span>{item.number}</span>
                  <span className="library-symbol">{item.icon}</span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="library-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <a href={item.target} className="library-link">
                  Explore this area <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WEEKLY RESET */}

      <section className="weekly-section" id="weekly-reset">
        <div className="weekly-inner">
          <div className="weekly-copy">
            <div className="eyebrow" style={{ color: "var(--mint)" }}>
              <span className="eyebrow-dot" /> YOUR WEEK, REIMAGINED
            </div>

            <h2>
              Make room for
              <br />
              <em>what matters.</em>
            </h2>

            <p>
               A good week isn&apos;t about fitting more into every day. Choose what
              deserves your time and leave a little room for the unexpected.
            </p>

            <button className="button-lime" onClick={() => scrollTo("planner")}>
              Plan your next step <span className="arrow">↗</span>
            </button>
          </div>

          <div className="weekly-board">
            <div className="weekly-board-head">
              <div>
                <span className="weekly-label">A GENTLER WEEK</span>
                <h3>Your weekly intentions</h3>
              </div>
              <span className="weekly-spark">✳</span>
            </div>

            {weeklyPlans.map((item, index) => (
              <div className="weekly-row" key={item.day}>
                <span className="weekly-day">{item.day}</span>
                <div className="weekly-row-copy">
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
                <span className="weekly-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}

            <div className="weekly-footer">
              <span>Four gentle reminders.</span>
              <span>Zero perfect days required. ♡</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}

      <section className="closing">
        <div className="closing-inner">
          <div>
            <div className="eyebrow" style={{ color: "var(--mint)" }}>
              <span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS SMALL
            </div>
            <h2>
              Make some space
              <br />
              for <em>yourself.</em>
            </h2>
          </div>

          <button className="button-lime" onClick={() => scrollTo("planner")}>
            Start your daily reset <span className="arrow">↗</span>
          </button>
        </div>
      </section>

    </div>
  );
}
