import React, { useEffect, useState } from "react";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import "datatables.net";
import $ from "jquery";

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const table = $("#example").DataTable({
      data: data,
      columns: [
        {
          data: "id",
          title: "#",
        },
        {
          data: "first_name",
          title: "Ism",
        },
        {
          data: "last_name",
          title: "Familiya",
        },
        {
          data: "father_name",
          title: "Otasi",
        },
        {
          data: "status_.status",
          title: "Status",
        },
        {
          data: null,
          title: "Actions",
          orderable: false,
          render: function (data) {
            return `
                <div style="display: flex; gap:5px">
                  <button class="btn btn-outline-primary edit-btn" data-id="${
                    data?.id
                  }">
                    <i class="fa fa-edit"></i>
                  </button>
                  ${
                    data?.status_?.id === 1
                      ? `<button class="btn btn-outline-danger delete-btn" data-id="${data?.id}">
                    <i class="fa fa-trash"></i>
                  </button> `
                      : ""
                  }
                </div>
              `;
          },
        },
      ],
      destroy: true,
      responsive: true,
      ordering: false,
    });
    $("#example tbody").on("click", ".edit-btn", function () {
      const id = $(this).data("id");
      console.log(id);
    });
    $("#example tbody").on("click", ".delete-btn", function () {
      const id = $(this).data("id");
      console.log(id);
    });
    return () => {
      table.destroy();
      $("#example tbody").off("click", ".edit-btn");
      $("#example tbody").off("click", ".delete-btn");
    };
  }, [data]);

  async function getUsers() {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/departament/getalldepartament`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="content-wrapper min-height-100">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Home</h1>
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
                    {data.length ? (
                      <table
                        id="example"
                        className="display responsive table table-bordered w-100 "
                      ></table>
                    ) : (
                      <table className="display responsive table table-bordered w-100 ">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Ism</th>
                            <th>Familiya</th>
                            <th>Otasi</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={6} className="text-center">
                              {loading ? "Loading..." : "Data not found"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                  <div className="card-footer clearfix">
                    <ul className="pagination pagination-sm m-0 float-right"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
