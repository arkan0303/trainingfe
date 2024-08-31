import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const Wawancara: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<EmployeeFormData>({
    userId: 0,
    email: "",
    plant: "",
    position: "",
  });
  const [interviewFormData, setInterviewFormData] = useState<InterviewFormData>(
    {
      employeeId: 0,
      interviewDate: "",
      questions: "",
      answers: "",
      evaluationResult: "",
    }
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [employeeCreated, setEmployeeCreated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      userId: Number(formData.userId),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/employees",
        dataToSend
      );
      console.log("Data successfully submitted:", response.data);
      setEmployeeCreated(true);
      setSuccess("Employee created successfully!");
      setError(null);
    } catch (error: any) {
      console.error("There was an error submitting the data:", error);
      const errorMessage = error.response?.data?.error || "Unknown error";
      setError(`Error: ${errorMessage}`);
      setSuccess(null);
    }
  };

  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");
  const [evaluationResult, setEvaluationResult] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/employees"
        );
        setEmployees(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmitInterview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/interviews",
        {
          employeeId: Number(selectedEmployeeId),
          interviewDate,
          questions,
          answers,
          evaluationResult,
        }
      );
      setMessage("Interview scheduled successfully!");
      setSuccess(null);
      setError(null);
    } catch (error) {
      setMessage("Failed to schedule interview.");
      setSuccess(null);
      setError(null);
    }
  };

  return (
    <Container style={{ marginTop: "5rem" }}>
      <Row>
        <Col>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                maxWidth: "800px",
              }}
            >
              <h2 className="text-center mb-4" style={{ color: "#343a40" }}>
                Create Employee
              </h2>
              {error && (
                <Alert
                  variant="danger"
                  style={{ marginBottom: "1rem", borderRadius: "8px" }}
                >
                  {error}
                </Alert>
              )}
              {success && (
                <Alert
                  variant="success"
                  style={{ marginBottom: "1rem", borderRadius: "8px" }}
                >
                  {success}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  controlId="formUserId"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <Form.Label
                    style={{ display: "block", marginBottom: "0.5rem" }}
                  >
                    User ID
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    style={{
                      display: "block",
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid #ced4da",
                      padding: "0.75rem",
                    }}
                    required
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  controlId="formEmail"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <Form.Label
                    style={{ display: "block", marginBottom: "0.5rem" }}
                  >
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      display: "block",
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid #ced4da",
                      padding: "0.75rem",
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group
                  controlId="formPlant"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <Form.Label
                    style={{ display: "block", marginBottom: "0.5rem" }}
                  >
                    Plant
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="plant"
                    value={formData.plant}
                    onChange={handleChange}
                    style={{
                      display: "block",
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid #ced4da",
                      padding: "0.75rem",
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group
                  controlId="formPosition"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <Form.Label
                    style={{ display: "block", marginBottom: "0.5rem" }}
                  >
                    Position
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    style={{
                      display: "block",
                      width: "100%",
                      borderRadius: "8px",
                      border: "1px solid #ced4da",
                      padding: "0.75rem",
                    }}
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#007bff",
                    borderColor: "#007bff",
                    color: "#fff",
                    fontSize: "1rem",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Create Employee
                </Button>
              </Form>
            </div>

            {employeeCreated && (
              <div
                style={{
                  flex: 1,
                  padding: "2rem",
                  borderRadius: "12px",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#ffffff",
                  maxWidth: "800px",
                  margin: "auto",
                }}
              >
                <h2 className="text-center mb-4" style={{ color: "#343a40" }}>
                  Create Interview
                </h2>
                {error && (
                  <Alert
                    variant="danger"
                    style={{ marginBottom: "1rem", borderRadius: "8px" }}
                  >
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert
                    variant="success"
                    style={{ marginBottom: "1rem", borderRadius: "8px" }}
                  >
                    {success}
                  </Alert>
                )}
                {message && (
                  <Alert
                    variant={
                      message.includes("successfully") ? "success" : "danger"
                    }
                    style={{ marginBottom: "1rem", borderRadius: "8px" }}
                  >
                    {message}
                  </Alert>
                )}
                <Form onSubmit={handleSubmitInterview}>
                  <Form.Group
                    controlId="formEmployeeId"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    <Form.Label
                      style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                      Employee
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedEmployeeId}
                      onChange={(e) => setSelectedEmployeeId(e.target.value)}
                      style={{
                        display: "block",
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        padding: "0.75rem",
                        color: "#000000 !important",
                      }}
                      required
                    >
                      <option value="" style={{ color: "#000000" }}>
                        Select Employee
                      </option>
                      {employees.map((employee: any) => (
                        <option
                          key={employee.id}
                          value={employee.id}
                          style={{ color: "#000000 !important" }}
                        >
                          {employee.user.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    controlId="formInterviewDate"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    <Form.Label
                      style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                      Interview Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      style={{
                        display: "block",
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        padding: "0.75rem",
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formQuestions"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    <Form.Label
                      style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                      Questions
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                      style={{
                        display: "block",
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        padding: "0.75rem",
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formAnswers"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    <Form.Label
                      style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                      Answers
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={answers}
                      onChange={(e) => setAnswers(e.target.value)}
                      style={{
                        display: "block",
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        padding: "0.75rem",
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formEvaluationResult"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    <Form.Label
                      style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                      Evaluation Result
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={evaluationResult}
                      onChange={(e) => setEvaluationResult(e.target.value)}
                      style={{
                        display: "block",
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        padding: "0.75rem",
                      }}
                      required
                    >
                      <option value="">Select Evaluation Result</option>
                      <option value="Lolos">Lolos</option>
                      <option value="Tidak Lolos">Tidak Lolos</option>
                    </Form.Control>
                  </Form.Group>

                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                      color: "#fff",
                      fontSize: "1rem",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Create Interview
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Wawancara;
