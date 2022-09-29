import { useState, useRef } from "react";
import { instructorsData } from "./data";
import { TiDeleteOutline } from "react-icons/ti";

import chevronImg from "../public/assets/chevron.svg";

import styles from "../styles/home.module.scss";
import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
export default function Dropdown() {
  const [instructors, setInstructors] = useState(instructorsData);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [active, setActive] = useState(false);

  function onInstructorSelect(id) {
    const getInstructor = instructors.find((inst) => inst.id === id);

    setSelectedInstructors((prevInstructors) => [
      ...prevInstructors,
      {
        ...getInstructor,
      },
    ]);

    setActive(false);
  }

  // deleted selectors instructors
  function onDeleteSelectedInstructor(id) {
    setSelectedInstructors((prevInstructors) =>
      prevInstructors.filter((instructor) => instructor.id !== id)
    );
  }

  return (
    <div className={styles.dropdown_container}>
      <div
        className={styles.dropdown_header}
        onClick={() => setActive((prev) => !prev)}
      >
        <p>Choose your instructor</p>
        <Image
          src={chevronImg}
          alt="select instructor"
          width="10px"
          height="10px"
        />
      </div>

      {/* GET SELECT USER AND DISPLAY HERE */}
      {selectedInstructors && selectedInstructors.length !== 0 ? (
        <div className={styles.selectedInstructor_wrapper}>
          {selectedInstructors.map((selected) => (
            <div key={selected.id} className={styles.selectedInstructor}>
              <p>{selected.name}</p>
              <TiDeleteOutline
                onClick={() => onDeleteSelectedInstructor(selected.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      {active && (
        <div className={styles.dropdown_main_wrapper}>
          {instructors &&
            instructors.map((inst) => (
              <div
                key={inst.id}
                className={styles.dropdown_main}
                onClick={() => onInstructorSelect(inst.id)}
                style={{
                  pointerEvents: selectedInstructors.some(
                    (sInst) => sInst.name === inst.name
                  )
                    ? "none"
                    : "auto",
                }}
              >
                <Image
                  src={inst.img}
                  alt="instructor"
                  width="38px"
                  height="38px"
                />
                <p
                  style={{
                    color: selectedInstructors.some(
                      (sInst) => sInst.name === inst.name
                    )
                      ? "rgba(0, 0, 0, 0.5)"
                      : "",
                  }}
                >
                  {inst.name}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
