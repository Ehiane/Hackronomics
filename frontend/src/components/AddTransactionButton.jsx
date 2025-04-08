import { useState } from "react";
import "./AddTransactionButton.css";

const AddTransactionButton = ({ onFormClick, onCsvClick }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="add-transaction-container">
            <button
                className="add-transaction-btn"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                + Add Transaction
            </button>
            {showDropdown && (
            <div className="dropdown-menu">
                <div onClick={onFormClick}>Add via Form</div>
                <div onClick={onCsvClick}>Upload CSV</div>
            </div>
            )}
        </div>
    );
};

export default AddTransactionButton;