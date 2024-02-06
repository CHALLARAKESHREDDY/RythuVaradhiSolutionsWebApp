import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { AiFillDelete } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import './MyCrops.css';

function ConfirmDialog({ onClose, onConfirm }) {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        <p>Are you sure you want to delete?</p>
        <button onClick={onConfirm} className="Yes-Button">Yes</button>
        <button onClick={onClose} className="No-Button">No</button>
      </div>
    </div>
  );
}


function MyCrops({ close }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [highlightedProduct, setHighlightedProduct] = useState('');
  const [deleteConfirmationIndex, setDeleteConfirmationIndex] = useState(null);

  const allProducts = [
    'Mirchi', 'Paddy', 'Cotton', 'Corn', 'Turmeric',
    'Pulses', 'Carrot', 'Brinjal', 'Tomato', 'Peas', 'Bottle Guard'
  ];

  const availableProducts = allProducts.filter(
    (product) => !selectedProducts.includes(product)
  );

  const handleAddButtonClick = () => {
    if (selectedProduct) {
      setSelectedProducts((prevProducts) => [...prevProducts, selectedProduct]);
      setSelectedProduct('');
      setHighlightedProduct('');
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setHighlightedProduct(product); // Highlight the selected product
  };

  const handleDeleteConfirmation = (index) => {
    setDeleteConfirmationIndex(index);
  };

  const handleDelete = (index, confirmed) => {
    setDeleteConfirmationIndex(null);
    
    if (confirmed) {
      const updatedProducts = [...selectedProducts];
      updatedProducts.splice(index, 1);
      setSelectedProducts(updatedProducts);
    }
  };

  return (
    <div className="Popup-Container">
      <div className="IoClose-Container">
        <IoClose onClick={close} style={{ fontSize: '30px' }} className="IoClose" />
      </div>
      <h3 className="MyCrops-Head">My Crops</h3>

      <div className="Crops-List">
        {selectedProducts.length > 0 ? (
          <div style={{width:"100%"}}>
            <ul style={{width:"100%"}}>
              {selectedProducts.map((product, index) => (
                <li key={index} className="List-Item">
                  {product}{' '}
                 <AiFillDelete  onClick={() => handleDeleteConfirmation(index)} />
                  {deleteConfirmationIndex === index && (
                    <ConfirmDialog
                      onClose={() => setDeleteConfirmationIndex(null)}
                      onConfirm={() => handleDelete(index, true)}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No crops selected</p>
        )}
      </div>

      <div className="Dropdown-Div">
        <details className="dropdown">
          <summary role="button">
            <span className="button">Select a Crop</span>
          </summary>
          <ul>
            {availableProducts.map((product, index) => (
              <li key={index}>
                <a href="#" onClick={() => handleProductSelect(product)}
                  style={{ color: highlightedProduct === product ? 'green' : 'black' }}>
                  {product}
                </a>
              </li>
            ))}
          </ul>
        </details>
        <button onClick={handleAddButtonClick} className="Add-Button">Add<TiPlus style={{marginLeft:"2px"}}/></button>
      </div>
    </div>
  );
}

export default MyCrops;
