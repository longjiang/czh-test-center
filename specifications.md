## Chinese Zero to Hero Course Quiz Interface Specifications

The goal is to build an interactive quiz and exam interface for **Chinese Zero to Hero** courses.

---

### Technical Requirements

* The interface must be built using **React** for the front-end.
* Styling must be implemented using **Tailwind CSS**.
* The project should use an ES module structure with React components stored in `src/components/` and utilities in `src/utils/`. Use `src/main.jsx` as the entry point and `src/index.html` (or the root `index.html` shell) to host the root element.

---

### Core Functionality and Content

* The system must support **multiple courses** (such as the Introduction to Chinese course developed in late 2025), each containing **multiple quizzes and exams**.
* **Question Types:** The system must support **multiple choice** questions and other question formats.
* **Data Structure:** Quiz and exam questions must be saved as **JSON files** and loaded dynamically by the application.

---

### User Experience and Flow

1.  **Selection:** Students must be able to **choose the course** they want, and then **select the specific quiz or exam** they wish to take.
2.  **Start Quiz/Exam:**
    * The questions for the selected quiz/exam must be **hidden** upon loading.
    * The **"Start Quiz"** button must be displayed.
    * Questions and the **submit buttons** should remain **hidden** until the student clicks **"Start Quiz."**
3.  **In-Progress:**
    * Each quiz/exam has a **time limit**.
    * Students must see a **progress countdown bar and timer** while completing the questions.
