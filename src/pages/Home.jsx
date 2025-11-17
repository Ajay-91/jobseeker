import { Divider, Typography } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import { Badge, Button, Stack } from "react-bootstrap";
import { createJob, deleteJob, getJob, updateJob } from "../services/allAPI";
import Swal from "sweetalert2";
import { FaSuitcase } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaCopy } from "react-icons/fa";

const Home = () => {
  const [jobData, setJobData] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");
  const [jobId, setJobId] = useState(null);
  useEffect(() => {
    display();
  }, []);

  const create = async () => {
    try {
      let reqBody = {
        companyName: companyName,
        position: position,
        status: status,
        date: date,
        notes: notes,
      };
      let apiResponse = await createJob(reqBody);
      console.log(apiResponse.data);
      if (apiResponse.status == 201) {
        Swal.fire({
          title: "Success!",
          text: "You have Successfully added your Application",
          icon: "success",
        });
        display();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong...",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const display = async () => {
    try {
      let apiResponse = await getJob();
      console.log(apiResponse.data);
      if (apiResponse.status == 200) {
        setJobData(apiResponse.data);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong...",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const delJob = async (id) => {
    try {
      let apiResponse = await deleteJob(id);
      if (apiResponse.status == 200) {
        Swal.fire({
          title: "Success!",
          text: "You have Successfully Deleted your Application",
          icon: "success",
        });
        display();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong...",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updJob = async () => {
    try {
      let reqBody = {
        companyName: companyName,
        position: position,
        status: status,
        date: date,
        notes: notes,
      };
      let apiResponse = await updateJob(jobId, reqBody);
      if (apiResponse.status == 200) {
        Swal.fire({
          title: "Success!",
          text: "You have Successfully edited your Application",
          icon: "success",
        });
        display();
        setCompanyName("");
        setPosition("");
        setStatus("");
        setDate("");
        setNotes("");
        setJobId("");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong...",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadJob = (jobObj) => {
    setCompanyName(jobObj.companyName);
    setPosition(jobObj.position);
    setStatus(jobObj.status);
    setDate(jobObj.date);
    setNotes(jobObj.notes);
    setJobId(jobObj.id);
  };

  const filteredJobs = search
    ? jobData.filter(
        (job) =>
          job.companyName.toLowerCase().includes(search.toLowerCase()) ||
          job.position.toLowerCase().includes(search.toLowerCase())
      )
    : jobData;

  let total = jobData.length;
  let applied = jobData.filter((job) =>
    job.status.toLowerCase().includes("applied")
  );
  let interviews = jobData.filter((job) =>
    job.status.toLowerCase().includes("interview")
  );
  let offers = jobData.filter((job) =>
    job.status.toLowerCase().includes("offer")
  );

  return (
    <div
      className="container mt-5 mb-5 d-flex flex-column align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row container shadow p-5">
        <div className="col-3 text-center">
          <Typography variant="p">Total Applications</Typography>
          <Typography>{total}</Typography>
        </div>
        <div className="col-3 text-center">
          <Typography variant="p">Applied</Typography>
          <Typography>{applied.length}</Typography>
        </div>
        <div className="col-3 text-center">
          <Typography variant="p">Interviews</Typography>
          <Typography>{interviews.length}</Typography>
        </div>
        <div className="col-3 text-center">
          <Typography variant="p"> Offers</Typography>
          <Typography>{offers.length}</Typography>
        </div>
      </div>

      <div
        className="mt-5 mb-5 shadow p-5 rounded d-flex flex-column gap-3"
        style={{ minWidth: 500 }}
      >
        <Typography variant="h4" className="text-danger">
          Add New Application
        </Typography>
        <Divider
          orientation="horizontal"
          className="border-1 rounded bg-dark"
        />
        <div>
          <Typography variant="h6">Company</Typography>
          <input
            value={companyName}
            type="text"
            className="form-control"
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <Typography variant="h6">Position</Typography>
          <input
            value={position}
            type="text"
            className="form-control"
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <Typography variant="h6">Status</Typography>
          <select
            value={status}
            name="status"
            id="status"
            onChange={(e) => setStatus(e.target.value)}
            className="form-control"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <Typography variant="h6">Applied Date</Typography>
          <input
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
            name=""
            id="date"
            className="form-control"
          />
        </div>
        <div>
          <Typography variant="h6">Notes</Typography>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Any additional notes..."
          />
        </div>
        {jobId ? (
          <>
            <Button onClick={updJob}>Edit Application</Button>
          </>
        ) : (
          <>
            <Button onClick={create}>Add Application</Button>
          </>
        )}
      </div>

      <div className=" container pb-5 w-100 d-flex flex-column align-items-center gap-3 p-3 shadow rounded  ">
        <Typography variant="h4" className="text-danger">
          Your Applications
        </Typography>
        <Divider
          orientation="horizontal"
          className="border-1 rounded bg-dark"
        />
        <input
          value={search}
          type="text"
          className="form-control w-50 mt-4"
          name="Search by company or position"
          placeholder="Search by Company or Position"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="w-75 p-4 d-flex flex-column gap-3">
          {search != "" ? (
            <>
              {filteredJobs.map((job, index) => (
                <div className="border rounded p-3 row" key={index}>
                  <div className="col-2 d-flex justify-content-center align-items-center">
                    <FaSuitcase className="fs-1 text-danger-emphasis" />
                  </div>
                  <div className="col-10 d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between">
                      <div>
                        <Typography variant="h5" className="text-primary">
                          {job.companyName}
                        </Typography>
                        <Typography variant="h6" className="text-danger">
                          {job.position}
                        </Typography>
                      </div>
                      <div>
                        <Badge>{job.status}</Badge>
                      </div>
                    </div>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex gap-2">
                        <SlCalender />
                        <Typography>{job.date}</Typography>
                      </div>
                      <div className="d-flex gap-2">
                        <FaCopy />
                        <Typography>{job.notes}</Typography>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => {
                            loadJob(job);
                          }}
                          className="btn bg-warning"
                        >
                          Edit
                        </button>
                        <button
                          className="btn bg-danger"
                          onClick={() => {
                            delJob(job.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {jobData.map((job, index) => (
                <div className="border rounded p-3 row" key={index}>
                  <div className="col-2 d-flex justify-content-center align-items-center">
                    <FaSuitcase className="fs-1 text-danger-emphasis" />
                  </div>
                  <div className="col-10 d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between">
                      <div>
                        <Typography variant="h5" className="text-primary">
                          {job.companyName}
                        </Typography>
                        <Typography variant="h6" className="text-danger">
                          {job.position}
                        </Typography>
                      </div>
                      <div>
                        <Badge>{job.status}</Badge>
                      </div>
                    </div>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex gap-2">
                        <SlCalender />
                        <Typography>{job.date}</Typography>
                      </div>
                      <div className="d-flex gap-2">
                        <FaCopy />
                        <Typography>{job.notes}</Typography>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => {
                            loadJob(job);
                          }}
                          className="btn bg-warning"
                        >
                          Edit
                        </button>
                        <button
                          className="btn bg-danger"
                          onClick={() => {
                            delJob(job.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
