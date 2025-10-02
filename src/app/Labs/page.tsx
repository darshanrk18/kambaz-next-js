import Link from "next/link";
export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <p>Name: Darshan Ravindra Konnur</p>
      <p>Section: CS 5610 Fall 2025 (Online) Section 05</p>
      <a
        href="https://github.com/darshanrk18/kambaz-next-js.git"
        target="_blank"
      >
        My Github Repo
      </a>

      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/" id="wd-lab3-link">
            Kambaz
          </Link>
        </li>
      </ul>
    </div>
  );
}
