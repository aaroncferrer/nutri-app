import './recordModal.css';
import Modal from 'react-bootstrap/Modal';

function RecordModal(props) {

    const { loading, showModal, setShowModal, recordData, recordForm, setRecordForm, handleSubmitRecord, handleCloseRecordForm, handleCreateRecord, showCreateRecordForm , userRole } = props;

    const renderRecordContent = () => {
        if (loading) {
            return <p>Loading...</p>;
        } else if (recordData) {
            return(
                <div className="records_container">
                <h5>Assessments</h5>
                <p>{recordData.assessments}</p>
                <div className="divider"></div>
                <h5>Recommendations</h5>
                <p>{recordData.recommendations}</p>
                <div className="divider"></div>
                <span>Notes: {recordData.notes}</span>
                </div>
            );
        }else if (showCreateRecordForm) {
            return(
                <div className="record_form">
                    <div className="record_input_container">
                        <h5>Assessments</h5>
                        <input
                            type="text"
                            value={recordForm.assessments}
                            onChange={(e) =>
                            setRecordForm({ ...recordForm, assessments: e.target.value })
                            }
                        />
                        <h5>Recommendations</h5>
                        <input
                            type="text"
                            value={recordForm.recommendations}
                            onChange={(e) =>
                            setRecordForm({ ...recordForm, recommendations: e.target.value })
                            }
                        />
                        <h5>Notes</h5>
                        <input
                            type="text"
                            value={recordForm.notes}
                            onChange={(e) =>
                            setRecordForm({ ...recordForm, notes: e.target.value })
                            }
                        />
                    </div>
                    <div className="record_form_btns">
                        <button className="custom_btn" onClick={handleSubmitRecord}>
                        Submit
                        </button>
                        <button className="custom_btn" onClick={handleCloseRecordForm}>
                        Close
                        </button>
                    </div>        
                </div>
            );
        }else {
        // No record yet, show "Create Record" button
            if(userRole === "dietitian"){
                return(
                    <div>
                        <p>No Record yet</p>
                        <button className="custom_btn" onClick={handleCreateRecord}>
                            Create Record
                        </button>
                    </div>
                );
            }else {
                return <p>No Record yet</p>
            }

        }
    };

    return(
        <Modal show={showModal} onHide={() => {setShowModal(false), handleCloseRecordForm()}}>
            <Modal.Header closeButton>
                <Modal.Title>Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>{renderRecordContent()}</Modal.Body>
                {recordData && (
                <Modal.Footer>
                    <button className="custom_btn" onClick={() => setShowModal(false)}>
                    Close
                    </button>
                </Modal.Footer>
                )}
        </Modal>
    )
}

export default RecordModal;