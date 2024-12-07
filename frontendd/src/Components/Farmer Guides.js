import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FarmerViewGuides = () => {
  const [guides, setGuides] = useState([]);
  const [type, setType] = useState('sorting'); // Default category

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/guides/${type}`);
        setGuides(response.data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      }
    };

    fetchGuides();
  }, [type]);

  return (
    <div className="container mt-5">
        <br />
        <br />
        <br />
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-outline-success mx-2 ${type === 'sorting' ? 'active' : ''}`}
          onClick={() => setType('sorting')}
        >
          Sorting
        </button>
        <button
          className={`btn btn-outline-success mx-2 ${type === 'preservation' ? 'active' : ''}`}
          onClick={() => setType('preservation')}
        >
          Preservation
        </button>
      </div>

      <div className="row">
        {guides.length > 0 ? (
          guides.map((guide) => (
            <div className="col-md-4 mb-4" key={guide._id}>
              <div className="card">
                <img
                  src={guide.image ? `http://localhost:5000/${guide.image}` : "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={guide.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{guide.title}</h5>
                  <a href={guide.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Watch Video
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No guides found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default FarmerViewGuides;
