import { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  FaChartLine,
  FaBullseye,
  FaCode,
  FaTrash,
  FaBrain,
  FaUser,
  FaBook,
  FaChartPie
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./App.css";

function App() {

  const API ="const API ="https://skillsprint-backend.onrender.com";

  const dashboardRef = useRef(null);
  const addSkillRef = useRef(null);
  const analyticsRef = useRef(null);
  const skillsRef = useRef(null);

  const [skills, setSkills] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [progress, setProgress] = useState("");
  const [goal, setGoal] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [userName, setUserName] =
    useState("Kaviya");

  const [role, setRole] =
    useState("Full Stack Developer");

  const loadSkills = async () => {
    const res = await axios.get(
      `${API}/skills`
    );
    setSkills(res.data);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const addSkill = async () => {

    if (
      !name ||
      !category ||
      !level
    )
      return;

    await axios.post(
      `${API}/skills`,
      {
        name,
        category,
        level,
        progress,
        goal
      }
    );

    setName("");
    setCategory("");
    setLevel("");
    setProgress("");
    setGoal("");

    loadSkills();
  };

  const deleteSkill = async (id) => {
    await axios.delete(
      `${API}/skills/${id}`
    );

    loadSkills();
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const totalSkills = skills.length;

  const avgProgress =
    skills.length > 0
      ? Math.round(
          skills.reduce(
            (sum, skill) =>
              sum +
              Number(
                skill.progress || 0
              ),
            0
          ) / skills.length
        )
      : 0;

  const advancedSkills =
    skills.filter(
      (s) =>
        s.level === "Advanced"
    ).length;

  const chartData = [
    {
      name: "Beginner",
      value: skills.filter(
        (s) =>
          s.level === "Beginner"
      ).length
    },
    {
      name: "Intermediate",
      value: skills.filter(
        (s) =>
          s.level ===
          "Intermediate"
      ).length
    },
    {
      name: "Advanced",
      value: skills.filter(
        (s) =>
          s.level === "Advanced"
      ).length
    }
  ];

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#22c55e"
  ];

  return (
    <div className="layout">

      <aside className="sidebar">

        <div className="profileCard">

          <div className="avatar">
            {userName[0]}
          </div>

          <input
            className="profileInput"
            value={userName}
            onChange={(e) =>
              setUserName(
                e.target.value
              )
            }
          />

          <input
            className="profileInput"
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
          />

        </div>

        <h2 className="brand">
          SkillSprint
        </h2>

        <div className="menu">

          <button
            onClick={() =>
              scrollToSection(
                dashboardRef
              )
            }
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              scrollToSection(
                addSkillRef
              )
            }
          >
            Add Skill
          </button>

          <button
            onClick={() =>
              scrollToSection(
                analyticsRef
              )
            }
          >
            Analytics
          </button>

          <button
            onClick={() =>
              scrollToSection(
                skillsRef
              )
            }
          >
            Skills
          </button>

        </div>

        <div className="sideStats">

          <h4>Overview</h4>

          <p>
            Skills: {totalSkills}
          </p>

          <p>
            Progress:
            {" "}
            {avgProgress}%
          </p>

          <p>
            Advanced:
            {" "}
            {advancedSkills}
          </p>

        </div>

      </aside>

      <main className="content">

        <section
          ref={dashboardRef}
        >
          <div className="hero">

            <h1>
              Welcome Back,
              {" "}
              {userName}
            </h1>

            <p>
              Track your
              learning journey,
              monitor growth,
              and achieve your
              career goals.
            </p>

          </div>

          <div className="statsGrid">

            <div className="statCard">
              <FaCode />
              <h2>
                {totalSkills}
              </h2>
              <span>
                Total Skills
              </span>
            </div>

            <div className="statCard">
              <FaChartLine />
              <h2>
                {avgProgress}%
              </h2>
              <span>
                Progress
              </span>
            </div>

            <div className="statCard">
              <FaBullseye />
              <h2>
                {advancedSkills}
              </h2>
              <span>
                Advanced
              </span>
            </div>

            <div className="statCard">
              <FaBrain />
              <h2>18</h2>
              <span>
                Learning Streak
              </span>
            </div>

          </div>
        </section>

        <section
          ref={addSkillRef}
          className="section"
        >

          <div className="formCard">

            <h2>
              Add New Skill
            </h2>

            <input
              placeholder="Skill Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Category
              </option>

              <option>
                Frontend Development
              </option>

              <option>
                Backend Development
              </option>

              <option>
                Full Stack Development
              </option>

              <option>
                Machine Learning
              </option>

              <option>
                Artificial Intelligence
              </option>

            </select>

            <select
              value={level}
              onChange={(e) =>
                setLevel(
                  e.target.value
                )
              }
            >
              <option>
                Beginner
              </option>
              <option>
                Intermediate
              </option>
              <option>
                Advanced
              </option>
            </select>

            <input
              type="number"
              placeholder="Progress"
              value={progress}
              onChange={(e) =>
                setProgress(
                  e.target.value
                )
              }
            />

            <input
              placeholder="Goal"
              value={goal}
              onChange={(e) =>
                setGoal(
                  e.target.value
                )
              }
            />

            <button
              onClick={addSkill}
            >
              Add Skill
            </button>

          </div>

        </section>

        <section
          ref={analyticsRef}
          className="section"
        >

          <div className="chartCard">

            <h2>
              Skill Analytics
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={100}
                >

                  {chartData.map(
                    (
                      _,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </section>

        <section
          ref={skillsRef}
          className="section"
        >

          <div className="searchBar">

            <input
              placeholder="Search Skill"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
            >
              <option>
                All
              </option>

              <option>
                Frontend Development
              </option>

              <option>
                Backend Development
              </option>

              <option>
                Machine Learning
              </option>

              <option>
                Artificial Intelligence
              </option>

            </select>

          </div>

          <div className="skillsGrid">

            {skills
              .filter(
                (skill) =>
                  skill.name
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
              )
              .filter(
                (skill) =>
                  filter === "All"
                    ? true
                    : skill.category ===
                      filter
              )
              .map(
                (skill) => (
                  <div
                    className="skillCard"
                    key={
                      skill._id
                    }
                  >

                    <div className="topRow">

                      <h3>
                        {
                          skill.name
                        }
                      </h3>

                      <span className="badge">
                        {
                          skill.level
                        }
                      </span>

                    </div>

                    <p>
                      {
                        skill.category
                      }
                    </p>

                    <div className="progressBar">

                      <div
                        className="progressFill"
                        style={{
                          width:
                            `${skill.progress}%`
                        }}
                      />

                    </div>

                    <small>
                      {
                        skill.progress
                      }
                      %
                      Completed
                    </small>

                    <div className="goalBox">
                      {
                        skill.goal
                      }
                    </div>

                    <button
                      className="deleteBtn"
                      onClick={() =>
                        deleteSkill(
                          skill._id
                        )
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>
                )
              )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;
