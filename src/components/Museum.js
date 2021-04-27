import React, { useState, useEffect } from "react";
import "../components/Museum.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Museum() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    let item;
    await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomNumber(
        item
      )}`
    )
      .then((response) => {
        if (response.status === 404) {
          fetchData();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.primaryImage && data.culture) {
          setInfo(data);
          setLoading(false);
          console.log(data);
        } else {
          fetchData();
        }
      })
      .catch((err) => console.log("error", err.message));
  }

  function randomNumber(item) {
    return Math.floor(Math.random() * 2000);
  }

  if (loading) {
    return (
      <div className="container-fluid ">
        <p className="display-1">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div
        id="container_controls"
        className="container-fluid w-100"
        key={info.objectID}
      >
        <div className="carousel-inner ">
          {/* <h1>{info.constituents.name}</h1> */}

          <div className="carousel-item active d-flex justify-content-center align-items-center">
            <img
              className="img-fluid rounded"
              src={info.primaryImageSmall}
              alt="primary"
            />
          </div>
          <div className="carousel-item d-flex justify-content-center align-items-center">
            <img
              className="img-fluid rounded"
              src={info.primaryImageSmall}
              alt="primary"
            />
          </div>

          {/* {Array.from(info).map((item) => (
          <img src={item.additionalImages} alt="additional" />
        ))} */}
        </div>
        <a
          className="carousel-control-prev"
          href="#container_controls"
          role="button"
          data-slide="prev"
          onClick={() => fetchData()}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </a>
        <a
          className="carousel-control-next"
          href="#container_controls"
          role="button"
          data-slide="next"
          onClick={() => fetchData()}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </a>
      </div>
      <div className="carousel-caption rounded">
        <h1>Name: {info.title}</h1>
        <h1>culture: {info.culture}</h1>
      </div>
    </div>
  );
}

export default Museum;
