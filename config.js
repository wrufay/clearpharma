<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ClearPharma - Patient Dashboard</title>
    <link
      rel="stylesheet"
      href="https://i.icomoon.io/public/temp/92804d2d14/UntitledProject/style.css"
    />

    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>

    <script type="importmap">
      {
        "imports": {
          "@google/generative-ai": "https://esm.run/@google/generative-ai"
        }
      }
    </script>
    
    <link rel="stylesheet" href="style.css" />

    <style>
      @import url("https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Stack+Sans+Headline:wght@200..700&display=swap");
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, sans-serif;
        background: linear-gradient(135deg, #e8f4f8 0%, #f5f9fb 100%);
        min-height: 100vh;
        padding-bottom: 80px;
      }

      /* Header */
      .header {
        background: white;
        font-family: "Stack Sans Headline", sans-serif;
        padding: 20px 25px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }

      .welcome-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .welcome-text h1 {
        color: #2c5f6f;
        font-size: 24px;
        margin-bottom: 5px;
      }

      .welcome-text p {
        color: #7ba8b5;
        font-size: 14px;
      }

      .user-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #5a9aae 0%, #7ba8b5 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 20px;
      }

      /* Alert Banner */
      .alert-banner {
        background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        padding: 15px 20px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 15px;
      }

      .alert-banner.critical {
        background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
      }

      .alert-icon {
        font-size: 24px;
      }

      .alert-content {
        flex: 1;
      }

      .alert-content strong {
        color: #2c5f6f;
        display: block;
        margin-bottom: 3px;
      }

      .alert-content p {
        color: #666;
        font-size: 14px;
      }

      /* Container */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }

      /* Quick Actions */
      .quick-actions {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
        margin-bottom: 25px;
      }

      .action-card {
        background: white;
        padding: 20px;
        border-radius: 16px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .action-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      }

      .action-icon {
        font-size: 32px;
        margin-bottom: 10px;
      }

      .action-label {
        color: #2c5f6f;
        font-size: 14px;
        font-weight: 600;
      }

      /* Card */
      .card {
        background: white;
        border-radius: 16px;
        padding: 25px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .card-header h3 {
        color: #2c5f6f;
        font-size: 18px;
        font-weight: 600;
      }

      .view-all {
        color: #5a9aae;
        font-size: 14px;
        cursor: pointer;
        text-decoration: none;
      }

      .view-all:hover {
        text-decoration: underline;
      }

      /* Medication Item */
      .medication-item {
        padding: 15px;
        border-radius: 12px;
        margin-bottom: 12px;
        border-left: 4px solid #5a9aae;
        background: #f8fbfc;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .medication-item:hover {
        background: #f0f8fa;
        transform: translateX(5px);
      }

      .medication-item.taken {
        border-left-color: #4caf50;
        opacity: 0.7;
      }

      .medication-item.missed {
        border-left-color: #f44336;
      }

      .med-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .med-name {
        font-weight: 600;
        color: #2c5f6f;
        font-size: 15px;
      }

      .med-status {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .med-status.upcoming {
        background: #e3f2fd;
        color: #2196f3;
      }

      .med-status.taken {
        background: #e8f5e9;
        color: #4caf50;
      }

      .med-status.missed {
        background: #ffebee;
        color: #f44336;
      }

      .med-dosage {
        color: #666;
        font-size: 14px;
        margin-bottom: 5px;
      }

      .med-time {
        color: #999;
        font-size: 13px;
      }

      /* Symptom Log */
      .symptom-item {
        padding: 12px 15px;
        background: #f8fbfc;
        border-radius: 8px;
        margin-bottom: 10px;
      }

      .symptom-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
      }

      .symptom-type {
        font-weight: 600;
        color: #2c5f6f;
        font-size: 14px;
      }

      .symptom-severity {
        padding: 3px 10px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
      }

      .symptom-severity.mild {
        background: #e8f5e9;
        color: #4caf50;
      }

      .symptom-severity.moderate {
        background: #fff3e0;
        color: #ff9800;
      }

      .symptom-severity.severe {
        background: #ffebee;
        color: #f44336;
      }

      .symptom-description {
        color: #666;
        font-size: 13px;
        margin-bottom: 5px;
      }

      .symptom-time {
        color: #999;
        font-size: 12px;
      }

      /* Metrics Grid */
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
      }

      .metric-box {
        background: #f8fbfc;
        padding: 20px;
        border-radius: 12px;
        text-align: center;
      }

      .metric-value {
        font-size: 28px;
        font-weight: bold;
        color: #2c5f6f;
        margin-bottom: 5px;
      }

      .metric-label {
        color: #7ba8b5;
        font-size: 13px;
        margin-bottom: 8px;
      }

      .metric-status {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 12px;
        border-radius: 12px;
        display: inline-block;
      }

      .status-normal {
        background: #e8f5e9;
        color: #4caf50;
      }

      .status-warning {
        background: #fff3e0;
        color: #ff9800;
      }

      .status-critical {
        background: #ffebee;
        color: #f44336;
      }

      /* Chat Float Button */
      .chat-float {
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #5a9aae 0%, #7ba8b5 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 28px;
        box-shadow: 0 4px 20px rgba(90, 154, 174, 0.4);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .chat-float:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 30px rgba(90, 154, 174, 0.5);
      }

      /* Bottom Navigation */
      .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        padding: 15px 0;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-around;
        z-index: 100;
      }

      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        color: #7ba8b5;
        text-decoration: none;
        font-size: 12px;
        padding: 8px 20px;
        border-radius: 12px;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .nav-item.active {
        color: #5a9aae;
        background: #e8f4f8;
      }

      .nav-item:hover {
        background: #f0f8fa;
      }

      .nav-icon {
        font-size: 24px;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .quick-actions {
          grid-template-columns: repeat(2, 1fr);
        }

        .metrics-grid {
          grid-template-columns: 1fr;
        }
      }

      /* Modal Styles */
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        justify-content: center;
        align-items: center;
      }

      .modal.active {
        display: flex;
      }

      .modal-content {
        background: white;
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .modal-header h2 {
        color: #2c5f6f;
        font-size: 22px;
      }

      .modal-close {
        background: none;
        border: none;
        font-size: 28px;
        color: #999;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
      }

      .modal-close:hover {
        color: #333;
      }

      .modal-body {
        margin-bottom: 20px;
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        color: #2c5f6f;
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .form-group input,
      .form-group textarea,
      .form-group select {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        font-size: 14px;
        transition: all 0.3s ease;
      }

      .form-group input:focus,
      .form-group textarea:focus,
      .form-group select:focus {
        outline: none;
        border-color: #5a9aae;
        box-shadow: 0 0 0 3px rgba(90, 154, 174, 0.1);
      }

      .form-group textarea {
        resize: vertical;
        min-height: 80px;
      }

      .modal-footer {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
      }

      .modal-btn {
        padding: 12px 24px;
        border: none;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .modal-btn-primary {
        background: linear-gradient(135deg, #5a9aae 0%, #7ba8b5 100%);
        color: white;
      }

      .modal-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(90, 154, 174, 0.3);
      }

      .modal-btn-secondary {
        background: #f5f5f5;
        color: #666;
      }

      .modal-btn-secondary:hover {
        background: #e0e0e0;
      }

      /* AI Chat Styling */
      .chat-message {
        margin-bottom: 15px;
        display: flex;
        gap: 10px;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .chat-message.user {
        flex-direction: row-reverse;
      }

      .chat-avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
      }

      .chat-message.ai .chat-avatar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .chat-message.user .chat-avatar {
        background: #5a9aae;
        color: white;
      }

      .chat-bubble {
        max-width: 75%;
        padding: 12px 16px;
        border-radius: 16px;
        line-height: 1.5;
        font-size: 14px;
      }

      .chat-message.ai .chat-bubble {
        background: #f0f0f0;
        color: #333;
        border-bottom-left-radius: 4px;
      }

      .chat-message.user .chat-bubble {
        background: #5a9aae;
        color: white;
        border-bottom-right-radius: 4px;
      }

      .typing-indicator {
        display: none;
        padding: 12px 16px;
        background: #f0f0f0;
        border-radius: 16px;
        width: fit-content;
        margin-bottom: 15px;
      }

      .typing-indicator.active {
        display: flex;
        gap: 5px;
        align-items: center;
      }

      .typing-indicator span {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #999;
        border-radius: 50%;
        animation: typing 1.4s infinite;
      }

      .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
      }

      .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-10px); }
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="welcome-section">
        <div class="welcome-text">
          <h1 id="welcomeText">Welcome back, Patient!</h1>
          <p id="dateText">Loading...</p>
        </div>
        <div style="display: flex; align-items: center; gap: 15px">
          <div class="user-avatar" id="userAvatar">P</div>
          <button
            onclick="logout()"
            style="
              padding: 8px 16px;
              background: #f44336;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-size: 14px;
              font-weight: 600;
            "
          >
            Logout
          </button>
        </div>
      </div>

      <div id="alertBanner" style="display: none"></div>
    </div>

    <div class="container">
      <div class="quick-actions">
        <div class="action-card" onclick="logSymptoms()">
          <div class="action-icon">📝</div>
          <div class="action-label">Log Symptoms</div>
        </div>
        <div class="action-card" onclick="viewMedications()">
          <div class="action-icon">💊</div>
          <div class="action-label">Medications</div>
        </div>
        <div class="action-card" onclick="requestConsultation()">
          <div class="action-icon">👨‍⚕️</div>
          <div class="action-label">Consultation</div>
        </div>
        <div class="action-card" onclick="viewEducation()">
          <div class="action-icon">📚</div>
          <div class="action-label">Education</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>💊 Today's Medications</h3>
          <a
            href="#"
            class="view-all"
            onclick="viewMedications(); return false;"
            >View All</a
          >
        </div>

        <div id="medicationsList">
          <p style="text-align: center; color: #999; padding: 20px">
            Loading medications...
          </p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>📋 Recent Symptom Logs</h3>
          <a href="#" class="view-all" onclick="logSymptoms(); return false;"
            >Log New</a
          >
        </div>

        <div id="symptomsList">
          <p style="text-align: center; color: #999; padding: 20px">
            No symptoms logged yet
          </p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>📊 Health Metrics</h3>
        </div>

        <div class="metrics-grid" id="healthMetrics">
          <div class="metric-box">
            <div class="metric-label">Blood Pressure</div>
            <div class="metric-value">120/80</div>
            <div class="metric-status status-normal">● Normal</div>
          </div>

          <div class="metric-box">
            <div class="metric-label">Blood Sugar</div>
            <div class="metric-value">95 mg/dL</div>
            <div class="metric-status status-normal">● Normal</div>
          </div>

          <div class="metric-box">
            <div class="metric-label">Heart Rate</div>
            <div class="metric-value">68 bpm</div>
            <div class="metric-status status-normal">● Normal</div>
          </div>

          <div class="metric-box">
            <div class="metric-label">Adherence</div>
            <div class="metric-value" id="adherenceValue">98%</div>
            <div class="metric-status status-normal">● Excellent</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>📅 Upcoming Events</h3>
        </div>

        <div id="upcomingEvents">
          <div class="medication-item" style="border-left-color: #7ba8b5; background: #f0f8fa;">
            <div class="med-header">
              <div class="med-name">Annual Checkup with Dr. Smith</div>
              <div class="med-status upcoming" style="background: #e6e6fa; color: #6a5acd;">
                Appointment
              </div>
            </div>
            <div class="med-dosage">Cardiology Clinic</div>
            <div class="med-time">Dec 15, 2025 at 2:00 PM</div>
          </div>

          <p style="text-align: center; color: #999; padding: 20px">
            
          </p>
        </div>
      </div>
    </div>

    <div class="chat-float" onclick="openChat()" title="Chat with AI Assistant">
      💬
    </div>

    <div class="bottom-nav">
      <div class="nav-item active">
        <div class="nav-icon">🏠</div>
        <span>Home</span>
      </div>
      <div class="nav-item" onclick="viewMedications()">
        <div class="nav-icon">💊</div>
        <span>Medications</span>
      </div>
      <div class="nav-item">
        <div class="nav-icon">📊</div>
        <span>Health</span>
      </div>
      <div class="nav-item" onclick="viewEducation()">
        <div class="nav-icon">📚</div>
        <span>Education</span>
      </div>
      <div class="nav-item">
        <div class="nav-icon">⚙️</div>
        <span>Settings</span>
      </div>
    </div>

    <div id="symptomsModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Log Symptoms</h2>
          <button class="modal-close" onclick="closeModal('symptomsModal')">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Symptom Type</label>
            <input
              type="text"
              id="symptomType"
              placeholder="e.g., Headache, Nausea, Dizziness"
            />
          </div>
          <div class="form-group">
            <label>Severity</label>
            <select id="symptomSeverity">
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea
              id="symptomDescription"
              placeholder="Please describe what you're experiencing..."
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="modal-btn modal-btn-secondary"
            onclick="closeModal('symptomsModal')"
          >
            Cancel
          </button>
          <button class="modal-btn modal-btn-primary" onclick="submitSymptom()">
            Log Symptom
          </button>
        </div>
      </div>
    </div>

    <div id="medicationsModal" class="modal">
      <div class="modal-content" style="max-width: 600px">
        <div class="modal-header">
          <h2>💊 My Medications</h2>
          <button class="modal-close" onclick="closeModal('medicationsModal')">
            &times;
          </button>
        </div>
        <div class="modal-body" id="medicationsContent">
          <p>Loading medications...</p>
        </div>
        <div class="modal-footer">
          <button
            class="modal-btn modal-btn-secondary"
            onclick="closeModal('medicationsModal')"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <div id="consultationModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Request Consultation</h2>
          <button class="modal-close" onclick="closeModal('consultationModal')">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Reason for Consultation</label>
            <select id="consultReason">
              <option value="medication-question">Medication Question</option>
              <option value="side-effects">Side Effects</option>
              <option value="dosage-concern">Dosage Concern</option>
              <option value="refill">Refill Request</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Details</label>
            <textarea
              id="consultDetails"
              placeholder="Please describe your concern or question..."
              rows="5"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Preferred Contact Method</label>
            <select id="consultContact">
              <option value="message">Message</option>
              <option value="phone">Phone Call</option>
              <option value="video">Video Call</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="modal-btn modal-btn-secondary"
            onclick="closeModal('consultationModal')"
          >
            Cancel
          </button>
          <button
            class="modal-btn modal-btn-primary"
            onclick="submitConsultation()"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>

    <div id="educationModal" class="modal">
      <div class="modal-content" style="max-width: 700px">
        <div class="modal-header">
          <h2>📚 Education Resources</h2>
          <button class="modal-close" onclick="closeModal('educationModal')">
            &times;
          </button>
        </div>
        <div class="modal-body" id="educationContent">
          <div style="line-height: 1.8">
            <h3 style="color: #2c5f6f; margin-bottom: 15px">
              Medication Education
            </h3>
            <div
              style="
                background: #f8fbfc;
                padding: 15px;
                border-radius: 12px;
                margin-bottom: 15px;
              "
            >
              <h4 style="color: #5a9aae; margin-bottom: 10px">
                Understanding Your Medications
              </h4>
              <p style="color: #666; font-size: 14px">
                Learn about how your medications work, potential side effects,
                and best practices for taking them.
              </p>
            </div>

            <h3 style="color: #2c5f6f; margin: 20px 0 15px">
              Condition Management
            </h3>
            <div
              style="
                background: #f8fbfc;
                padding: 15px;
                border-radius: 12px;
                margin-bottom: 15px;
              "
            >
              <h4 style="color: #5a9aae; margin-bottom: 10px">
                Living with Chronic Conditions
              </h4>
              <p style="color: #666; font-size: 14px">
                Access guides on diet, exercise, and lifestyle changes to manage your health condition effectively.
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn modal-btn-secondary" onclick="closeModal('educationModal')">
            Close
          </button>
        </div>
      </div>
    </div>
    
    <div id="aiChatModal" class="modal">
      <div class="modal-content" style="max-width: 400px; padding: 20px;">
        <div class="modal-header" style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">
          <h2 style="font-size: 18px;">🤖 AI Health Assistant</h2>
          <button class="modal-close" onclick="closeModal('aiChatModal')">
            &times;
          </button>
        </div>
        <div class="modal-body" style="height: 400px; overflow-y: auto; padding: 0 5px;" id="chatMessages">
          <div class="chat-message ai">
            <div class="chat-avatar">🤖</div>
            <div class="chat-bubble">Hello! I'm your ClearPharma AI assistant. How can I help you with your medications or general health questions today?</div>
          </div>
        </div>
        <div class="typing-indicator" id="typingIndicator">
          <span></span><span></span><span></span>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <input type="text" id="chatInput" placeholder="Ask me about your medication..." style="flex-grow: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
          <button class="modal-btn modal-btn-primary" id="sendMessageBtn" onclick="sendMessage()">Send</button>
        </div>
      </div>
    </div>


    <script type="module">
      import { GoogleGenerativeAI } from "@google/generative-ai";

      // Re-define CONFIG here for simplicity, typically this would be imported from a separate file
      const CONFIG = {
          GEMINI_API_KEY: "AIzaSyBOO1S1t1-myCAC3HEadXeCCDM9-DqtK1A", // WARNING: Use env vars in production!
          GEMINI_MODEL: "gemini-2.5-flash",
          MAX_TOKENS: 1000,
          TEMPERATURE: 0.7,
          SYSTEM_PROMPT: `You are a helpful AI health assistant for ClearPharma, a medication management platform. Your role is to: provide helpful, accurate information about medications and health, be empathetic and professional, always remind users to consult with their healthcare provider for medical decisions, keep responses concise and actionable (2-3 paragraphs max), never provide specific medical diagnoses or treatment plans, focus on medication adherence, general wellness, and education. You are an AI assistant, not a replacement for healthcare professionals.`
      };

      const ai = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);
      const model = ai.getGenerativeModel({ model: CONFIG.GEMINI_MODEL });
      let chatSession = null; // To hold the active chat session

      const chatMessagesEl = document.getElementById('chatMessages');
      const chatInputEl = document.getElementById('chatInput');
      const typingIndicatorEl = document.getElementById('typingIndicator');
      const sendMessageBtn = document.getElementById('sendMessageBtn');


      // --- Core Functions for Modals (Globally available via 'window') ---
      
      /** Shows a modal. */
      function openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
      }

      /** Hides a modal. */
      window.closeModal = function(modalId) {
        document.getElementById(modalId).classList.remove('active');
      }

      // --- Dashboard Action Functions (Globally available via 'window') ---

      /** FIX: Define openChat() to resolve ReferenceError */
      window.openChat = function() {
        if (!chatSession) {
            chatSession = model.startChat({
                config: {
                    systemInstruction: CONFIG.SYSTEM_PROMPT,
                    temperature: CONFIG.TEMPERATURE,
                    maxOutputTokens: CONFIG.MAX_TOKENS,
                }
            });
        }
        openModal('aiChatModal');
        // Scroll to the latest message when opening the chat
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight; 
      }

      window.logout = function() {
        console.log('Logging out... (Firebase Auth implementation needed)');
        // Example: firebase.auth().signOut().then(() => window.location.href = 'login.html');
      };

      window.logSymptoms = function() { openModal('symptomsModal'); };
      window.viewMedications = function() { openModal('medicationsModal'); /* Populate data here */ };
      window.requestConsultation = function() { openModal('consultationModal'); };
      window.viewEducation = function() { openModal('educationModal'); };

      // --- Form Submission Placeholders ---

      window.submitSymptom = function() {
        const type = document.getElementById('symptomType').value;
        const severity = document.getElementById('symptomSeverity').value;
        console.log(`Submitting symptom: ${type} (${severity})`);
        closeModal('symptomsModal');
        alert('Symptom Logged!');
      };

      window.submitConsultation = function() {
        const reason = document.getElementById('consultReason').value;
        console.log(`Submitting consultation request for: ${reason}`);
        closeModal('consultationModal');
        alert('Consultation Requested! A staff member will contact you.');
      };


      // --- AI Chat Logic ---

      function displayMessage(role, text) {
        const msgEl = document.createElement('div');
        msgEl.className = `chat-message ${role}`;
        msgEl.innerHTML = `
          <div class="chat-avatar">${role === 'ai' ? '🤖' : 'P'}</div>
          <div class="chat-bubble">${text.replace(/\n/g, '<br>')}</div>
        `;
        chatMessagesEl.appendChild(msgEl);
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
      }

      async function generateResponse(prompt) {
        if (!chatSession) return;
        
        try {
          typingIndicatorEl.classList.add('active');
          
          const result = await chatSession.sendMessage({ message: prompt });
          
          typingIndicatorEl.classList.remove('active');
          displayMessage('ai', result.text);

        } catch (error) {
          console.error("Gemini API Error:", error);
          typingIndicatorEl.classList.remove('active');
          displayMessage('ai', "Sorry, I ran into an error. Please check the console or try again.");
        }
      }

      window.sendMessage = async function() {
        const message = chatInputEl.value.trim();
        if (!message) return;

        displayMessage('user', message);
        chatInputEl.value = '';
        sendMessageBtn.disabled = true; // Disable button while AI processes

        await generateResponse(message);

        sendMessageBtn.disabled = false; // Re-enable
      };

      // Allow sending messages via Enter key
      chatInputEl.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
              window.sendMessage();
          }
      });


      // --- Initial Setup and Data Loading Placeholder ---

      window.onload = function() {
        const now = new Date();
        document.getElementById('dateText').textContent = now.toDateString();
        
        // Load dynamic data here (Firebase Firestore logic would go here)
        // Example: loadMedicationsForToday();
      };
    </script>
  </body>
</html>