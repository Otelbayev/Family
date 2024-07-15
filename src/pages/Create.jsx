import { message, Select } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";

const selectStyle = {
  width: "100%",
  height: "40px",
};

const Create = () => {
  const [isDead, setIsDead] = useState(false);
  const [spouse, setSpouse] = useState(false);
  const [parent, setParent] = useState(0);

  const nameRef = useRef();
  const lnameRef = useRef();
  const patronymicRef = useRef();
  const imgRef = useRef();
  const bdate = useRef();
  const ddate = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      message.loading({ key: "bbb", content: "Loading!" });
      const formData = new FormData();
      formData.append("title", "none"),
        formData.append("first_name", nameRef?.current?.value);
      formData.append("last_name", lnameRef?.current?.value);
      formData.append("father_name", patronymicRef?.current?.value);
      formData.append("img_up", imgRef?.current?.files[0]);
      formData.append("birthday_", bdate?.current?.value || "");
      formData.append("died_day_", ddate?.current?.value || "");
      formData.append("is_died", isDead);
      formData.append("is_spouse", spouse);
      formData.append("text", "none");
      formData.append("parent_id", parent);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API}/departament/createdepartament`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      res.status === 200 &&
        message.success({ key: "bbb", content: "Successfully created!" });
    } catch (err) {
      message.error({ key: "bbb", content: "Error!" });
    }
  };

  return (
    <div>
      <div className="content-wrapper min-height-100">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit} className="row">
                      <div className="form-group col-md-4">
                        <label htmlFor="name">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter name"
                          ref={nameRef}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          placeholder="Enter surname"
                          ref={lnameRef}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="patronymic">Patronymic</label>
                        <input
                          type="text"
                          className="form-control"
                          id="patronymic"
                          placeholder="Patronymic"
                          ref={patronymicRef}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label for="dead" class="form-label">
                          Spouse
                        </label>
                        <Select
                          style={selectStyle}
                          options={[
                            { value: false, label: "false" },
                            { value: true, label: "true" },
                          ]}
                          value={spouse}
                          onChange={(e) => setSpouse(e)}
                        />
                      </div>
                      <div className="form-group col-md-5">
                        <label htmlFor="parent">
                          {spouse ? "Select spouse" : "Parent"}
                        </label>
                        <Select
                          showSearch
                          style={selectStyle}
                          placeholder="Search to Select"
                          optionFilterProp="label"
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          value={parent}
                          onChange={(e) => setParent(e)}
                          options={[
                            {
                              value: "1",
                              label: "Not Identified",
                            },
                            {
                              value: "2",
                              label: "Closed",
                            },
                            {
                              value: "3",
                              label: "Communicated",
                            },
                            {
                              value: "4",
                              label: "Identified",
                            },
                            {
                              value: "5",
                              label: "Resolved",
                            },
                            {
                              value: "6",
                              label: "Cancelled",
                            },
                          ]}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label for="formFile" class="form-label">
                          Img
                        </label>
                        <input
                          class="form-control"
                          type="file"
                          id="formFile"
                          ref={imgRef}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="birthday">Birthday</label>
                        <input
                          type="date"
                          className="form-control"
                          id="birthday"
                          placeholder="birthday"
                          ref={bdate}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label for="dead" class="form-label">
                          Is dead?
                        </label>
                        <Select
                          style={selectStyle}
                          options={[
                            { value: false, label: "false" },
                            { value: true, label: "true" },
                          ]}
                          value={isDead}
                          onChange={(e) => setIsDead(e)}
                        />
                      </div>
                      {isDead && (
                        <div className="form-group col-md-4">
                          <label htmlFor="death">Date of death</label>
                          <input
                            type="date"
                            className="form-control"
                            id="death"
                            placeholder="death"
                            ref={ddate}
                          />
                        </div>
                      )}
                      <div className="form-group col-md-12">
                        <button type="submit" className="btn btn-primary">
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Create;
