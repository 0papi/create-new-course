1. Create custom dropdown menu
2. Create context for collecting form data


<div className={`${styles.form_group} ${styles.select_wrapper}`}>
            <label htmlFor="class_instructor">Choose an instructor</label>
            <select
              name="instructor"
              id="instructor"
              onChange={onInstructorChange}
              className={styles.instructor_select}
            >
              <option selected disabled>
                Choose your instructor
              </option>
              {instructors &&
                instructors.map((instructor) => (
                  <option
                    key={instructor.id}
                    value={instructor.name}
                    disabled={selectedInstructors.some(
                      (int) => int.name === instructor.name
                    )}
                  >
                    {instructor.name}
                  </option>
                ))}
            </select>
            {/* display selected instructors */}
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
          </div>