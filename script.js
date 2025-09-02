<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEED Training - Student Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        :root {
            --primary-color: #1e3a8a;
            --secondary-color: #3b82f6;
            --accent-color: #60a5fa;
            --hover-color: #1e40af;
            --background-color: #f8fafc;
            --text-color: #1f2937;
            --text-light: #64748b;
            --bg-white: #ffffff;
            --border-color: #e2e8f0;
            --card-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            --card-hover-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            --radius: 12px;
            --transition: all 0.3s ease;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
        }
        
        body {
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            font-size: 16px;
            overflow-x: hidden; /* Prevent horizontal scrolling */
        }
        
        /* Loading overlay */
        #loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--bg-white);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: opacity 0.6s ease-out, visibility 0.6s ease-out;
        }
        
        .loading-spinner {
            display: inline-block;
            width: 60px;
            height: 60px;
            border: 5px solid rgba(59, 130, 246, 0.2);
            border-radius: 50%;
            border-top-color: var(--secondary-color);
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        
        .loading-text {
            color: var(--primary-color);
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        
        .loading-progress {
            width: 200px;
            height: 6px;
            background-color: var(--background-color);
            border-radius: 3px;
            margin-top: 15px;
            overflow: hidden;
        }
        
        .loading-progress-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            border-radius: 3px;
            transition: width 0.3s ease;
        }
        
        /* Main content container - hidden initially */
        #main-content {
            opacity: 0;
            transition: opacity 0.5s ease-in;
        }
        
        .container {
            width: 100%;
            /*max-width: 1400px;  For larger screens */
            margin: 0 auto;
            padding: 16px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border-color);
            position: relative;
        }
        
        .main-title {
            font-size: 32px; /* Reduced size for mobile */
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 8px;
            position: relative;
        }
        
        .main-title::after {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            border-radius: 10px;
        }
        
        .sub-title {
            font-size: 14px;
            font-weight: 400;
            color: var(--text-light);
            letter-spacing: 0.5px;
            margin-top: 15px;
        }

        /* Decorative elements from login page */
        .decorative-element {
            position: absolute;
            opacity: 0.4;
            pointer-events: none;
            z-index: 0;
        }
        
        .circle-element {
            width: 125px;
            height: 125px;
            border: 2px solid var(--secondary-color);
            border-radius: 50%;
            top: -85px;
            right: -80px;
            position: absolute;
        }
        
        .diagonal-element {
            width: 100px;
            height: 2px;
            background: var(--accent-color);
            transform: rotate(45deg);
            bottom: 115px;
            left: -50px;
            position: absolute;
        }

        .nav-bar {
            display: flex;
            flex-direction: column;
            align-items: center; /* Center aligned for mobile */
            margin-bottom: 20px;
            width: 100%; /* Full width */
            text-align: center;
        }

        #welcomeMessage {
            font-size: 18px; /* Smaller for mobile */
            margin-bottom: 12px;
            font-weight: 500;
            color: var(--primary-color);
        }

        .logout-btn {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: var(--radius);
            cursor: pointer;
            font-weight: 500;
            transition: var(--transition);
            margin-top: 8px;
            font-size: 16px;
            width: 120px; /* Fixed width */
            box-shadow: 0 4px 8px rgba(30, 58, 138, 0.2);
            position: relative;
            overflow: hidden;
        }

        .logout-btn:hover {
            background-color: var(--hover-color);
            box-shadow: 0 6px 12px rgba(30, 58, 138, 0.3);
            transform: translateY(-2px);
        }
        
        .logout-btn::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: all 0.6s ease;
            z-index: 1;
        }
        
        .logout-btn:hover::before {
            left: 100%;
        }
        
        /* Mobile logout container below session timings */
        .mobile-logout-container {
            display: flex;
            justify-content: center;
            margin: 16px 0;
            width: 100%;
        }
        
        /* Hide desktop logout button on mobile */
        .desktop-only-logout {
            display: none;
        }
        
        .error-message {
            color: #e74c3c;
            padding: 12px;
            margin: 16px 0;
            font-weight: 500;
            font-size: 14px;
            background-color: rgba(231, 76, 60, 0.1);
            border-radius: var(--radius);
            display: none;
            text-align: center;
        }
        
        .dashboard-content {
            display: flex;
            flex-direction: column; /* Stack vertically on mobile */
            width: 100%;
        }
        
        .info-box, .attendance-box {
            background-color: var(--bg-white);
            border-radius: var(--radius);
            padding: 20px;
            margin-bottom: 24px;
            box-shadow: var(--card-shadow);
            transition: var(--transition);
            width: 100%; /* Full width on mobile */
            position: relative;
            overflow: hidden;
        }
        
        .info-box:hover, .attendance-box:hover {
            box-shadow: var(--card-hover-shadow);
            transform: translateY(-3px);
        }
        
        .info-row {
            margin-bottom: 16px;
            position: relative;
            z-index: 1;
        }
        
        .info-label {
            font-weight: 600;
            color: var(--text-light);
            margin-bottom: 4px;
            font-size: 13px;
            letter-spacing: 0.5px;
        }
        
        .info-value {
            color: var(--text-color);
            font-size: 16px;
            word-break: break-word;
            font-weight: 500;
        }
        
        .attendance-header {
            font-size: 18px;
            margin-bottom: 20px;
            color: var(--primary-color);
            font-weight: 600;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 10px;
            text-align: center;
        }
        
        .session-timings {
            background-color: white;
            padding: 15px;
            border-radius: var(--radius);
            margin-top: 20px;
            margin-bottom: 20px;
            font-size: 14px;
            border-left: 4px solid var(--accent-color);
            background: rgba(240, 245, 255, 0.7);
        }
        
        .session-title {
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .session-time {
            margin-bottom: 6px;
        }
        
        .session-name {
            font-weight: 500;
            margin-right: 8px;
        }
        
        .attendance-percentage {
            background: linear-gradient(90deg, var(--primary-color), var(--hover-color));
            padding: 12px;
            border-radius: var(--radius);
            margin: 20px 0;
            display: flex;
            align-items: center;
            justify-content: center; /* Center on mobile */
            box-shadow: 0 4px 8px rgba(30, 58, 138, 0.2);
        }
        
        .attendance-label {
            font-weight: 600;
            color: white;
            font-size: 14px;
            margin-right: 8px;
        }
        
        .attendance-value {
            font-weight: 700;
            color: white;
            font-size: 16px;
        }
        
        /* Make only the attendance table horizontally scrollable */
        .attendance-table-container {
            width: 100%;
            overflow-x: auto; /* Horizontal scroll only for the table */
            -webkit-overflow-scrolling: touch;
            margin: 0 auto;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            font-size: 13px;
            min-width: 450px; /* Ensures table needs horizontal scrolling on small screens */
        }
        
        th, td {
            padding: 12px 8px;
            text-align: center;
            border-bottom: 1px solid var(--border-color);
        }
        
        th {
            color: var(--text-light);
            font-weight: 600;
            white-space: nowrap;
        }
        
        td {
            color: var(--text-color);
            font-weight: 500;
        }
        
        tbody tr:hover {
            background-color: rgba(30, 64, 175, 0.05);
        }
        
        .date-column {
            text-align: center;
            font-weight: 600;
            color: var(--text-color);
            white-space: nowrap;
        }
        
        .footer {
            text-align: center;
            margin-top: 32px;
            color: var(--text-light);
            font-size: 13px;
            padding: 16px;
            border-top: 1px solid var(--border-color);
        }
        
        .status-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .badge-present {
            background-color: #fef08a;
            color: #854d0e;
        }
        
        .badge-absent {
            background-color: #1e293b;
            color: white;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Animation for element appearance */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in-element {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        /* Enhanced responsive styles */
        @media (min-width: 768px) {
            .container {
                padding: 24px;
            }
            
            .main-title {
                font-size: 40px;
            }
            
            .nav-bar {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                text-align: left;
            }
            
            #welcomeMessage {
                font-size: 20px;
                margin-bottom: 0;
            }
            
            .dashboard-content {
                flex-direction: row;
                flex-wrap: wrap;
                gap: 24px;
            }
            
            .info-box {
                flex: 1;
                min-width: 300px;
            }
            
            .attendance-box {
                flex: 2;
                min-width: 450px;
            }
            
            .attendance-header {
                text-align: left;
            }
            
            .attendance-percentage {
                justify-content: flex-start;
            }
            
            /* Show desktop logout button and hide mobile logout on larger screens */
            .desktop-only-logout {
                display: block;
            }
            
            .mobile-logout-container {
                display: none;
            }
            
            .main-title::after {
                left: 50%;
                transform: translateX(-50%);
            }
        }
    </style>
</head>
<body>
    <!-- Loading Overlay -->
    <div id="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading your dashboard...</div>
        <div class="loading-progress">
            <div id="loading-progress-bar" class="loading-progress-bar"></div>
        </div>
    </div>
    
    <!-- Main Content (initially hidden) -->
    <div id="main-content">
        <div class="container">
            <div class="header fade-in-element" style="animation-delay: 0.1s;">
                <!--<div class="decorative-element circle-element"></div>-->
                <div class="decorative-element diagonal-element"></div>
                <h1 class="main-title">SEED Training</h1>
                <div class="sub-title">01 September 2025 to 04 September 2025</div>
            </div>
            
            <div class="nav-bar fade-in-element" style="animation-delay: 0.2s;">
                <h2 id="welcomeMessage">Welcome, Student</h2>
                <!-- Logout button moved to mobile-logout-container in mobile view -->
                <button id="logoutBtn" class="logout-btn desktop-only-logout"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </div>
            
            <div id="errorMessage" class="error-message"></div>
            
            <div class="dashboard-content">
                <div class="info-box fade-in-element" style="animation-delay: 0.3s;">
                    <div class="decorative-element circle-element" style="opacity: 0.4;"></div>
                    <h3 class="attendance-header">Student Information</h3>
                    <div class="info-row">
                        <div class="info-label">Name</div>
                        <div id="name" class="info-value"></div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Roll Number</div>
                        <div id="roll" class="info-value"></div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Department</div>
                        <div id="department" class="info-value"></div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Venue</div>
                        <div id="venue" class="info-value"></div>
                    </div>
                    
                </div>
                
                <div class="attendance-box fade-in-element" style="animation-delay: 0.4s;">
                    <div class="decorative-element diagonal-element" style="opacity: 0.1;"></div>
                    <h2 class="attendance-header">Attendance Record</h2>
                    
                    <div class="attendance-percentage">
                        <span class="attendance-label">Attendance Percentage:</span>
                        <span id="attendancePercentage" class="attendance-value">-</span>
                    </div>
                    
                    <!-- Only this container is horizontally scrollable -->
                    <div class="attendance-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Session 1</th>
                                    <th>Session 2</th>
                                    <th>Session 3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="date-column">01 Sep 2025</td>
                                    <td id="sep01s1"></td>
                                    <td id="sep01s2"></td>
                                    <td id="sep01s3"></td>
                                </tr>
                                <tr>
                                    <td class="date-column">02 Sep 2025</td>
                                    <td id="sep02s1"></td>
                                    <td id="sep02s2"></td>
                                    <td id="sep02s3"></td>
                                </tr>
                                <tr>
                                    <td class="date-column">03 Sep 2025</td>
                                    <td id="sep03s1"></td>
                                    <td id="sep03s2"></td>
                                    <td id="sep03s3"></td>
                                </tr>
                                <tr>
                                    <td class="date-column">04 Sep 2025</td>
                                    <td id="sep04s1"></td>
                                    <td id="sep04s2"></td>
                                    <td id="sep04s3"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Mobile rep button -->
                    <div id="mobileRepButtonContainer" class="mobile-logout-container" style="display: none;">
                        <button id="mobileViewClassmatesBtn" class="logout-btn" style="width: 200px; font-size: 14px;">
                            <i class="fas fa-users"></i> View Classmates Attendance
                        </button>
                    </div>

                    <div class="session-timings">
                        <div class="session-title"><i class="fas fa-clock"></i> Session Timings</div>
                        <div class="session-time">
                            <span class="session-name">Session 1:</span> 09:00 AM - 11:00 AM
                        </div>
                        <div class="session-time">
                            <span class="session-name">Session 2:</span> 11:30 AM - 01:30 PM
                        </div>
                        <div class="session-time">
                            <span class="session-name">Session 3:</span> 02:30 PM - 04:30 PM
                        </div>
                    </div>
                    
                    <!-- Mobile logout button container -->
                    <div class="mobile-logout-container">
                        <button id="mobileLogoutBtn" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</button>
                    </div>
                </div>
            </div>
            
            <div class="footer fade-in-element" style="animation-delay: 0.5s;">
                For any discrepancies in attendance, please contact Learning & Development, PSG College of Arts & Science
            </div>
        </div>
    </div>

    <script>
        // Get DOM elements for loading management
        const loadingOverlay = document.getElementById('loading-overlay');
        const mainContent = document.getElementById('main-content');
        const progressBar = document.getElementById('loading-progress-bar');
        const loadingText = document.querySelector('.loading-text');

        // Get DOM elements for data display
        const errorDiv = document.getElementById('errorMessage');
        const logoutBtn = document.getElementById('logoutBtn');
        const welcomeMessage = document.getElementById('welcomeMessage');

        // Function to update the loading progress
        function updateLoadingProgress(message, progress) {
            loadingText.textContent = message;
            progressBar.style.width = `${progress}%`;
        }

        // Function to simulate a gradually increasing progress over 5 seconds
        function simulateLoading() {
            const totalDuration = 500; // 1 seconds in milliseconds
            const startTime = Date.now();
            let progress = 0;
            
            // Define loading messages at different stages
            const loadingMessages = [
                { threshold: 0, message: "Ready!" },
            ];
            
            // Update function that will be called repeatedly
            const updateProgress = () => {
                const elapsedTime = Date.now() - startTime;
                const progressPercent = Math.min(Math.floor((elapsedTime / totalDuration) * 100), 99);
                
                // Find appropriate message for current progress
                const currentMessageObj = loadingMessages
                    .slice()
                    .reverse()
                    .find(msg => progressPercent >= msg.threshold);
                    
                if (currentMessageObj) {
                    updateLoadingProgress(currentMessageObj.message, progressPercent);
                }
                
                if (elapsedTime < totalDuration) {
                    // Continue updating until we reach the total duration
                    requestAnimationFrame(updateProgress);
                } else {
                    // Complete the loading bar at 100%
                    updateLoadingProgress("Ready!", 100);
                    
                    // Small delay after reaching 100% before hiding overlay
                    setTimeout(() => {
                        loadingOverlay.style.opacity = '0';
                        loadingOverlay.style.visibility = 'hidden';
                        mainContent.style.opacity = '1';
                    }, 300);
                }
            };
            
            // Start the progress updates
            updateProgress();
        }

        // Create logout overlay element
        const logoutOverlay = document.createElement('div');
        logoutOverlay.id = 'logout-overlay';
        logoutOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.95);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
        `;

        const logoutSpinner = document.createElement('div');
        logoutSpinner.className = 'loading-spinner';

        const logoutMessage = document.createElement('div');
        logoutMessage.style.cssText = `
            color: var(--primary-color);
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-top: 20px;
        `;
        logoutMessage.textContent = 'Logging out...';

        logoutOverlay.appendChild(logoutSpinner);
        logoutOverlay.appendChild(logoutMessage);
        document.body.appendChild(logoutOverlay);

        // Get both logout buttons
        const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

        // Function to handle logout
        function handleLogout() {
            // Show logout overlay
            logoutOverlay.style.visibility = 'visible';
            logoutOverlay.style.opacity = '1';
            
            // Simulate logout process with delay
            setTimeout(() => {
                // Clear session and redirect to login page
                sessionStorage.removeItem('studentPortalSession');
                window.location.href = '../student-login.html';
            }, 2000); // 2-second delay
        }

        // Add event listeners to both logout buttons
        logoutBtn.addEventListener('click', handleLogout);
        mobileLogoutBtn.addEventListener('click', handleLogout);

        // Add SVG to logout buttons
        function addLogoutIcon() {
            const logoutSvg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    style="width: 1.2em; height: 1.2em; margin-right: 0.1em; vertical-align: middle;">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
            `;
            
            // Add icon to both logout buttons
            logoutBtn.innerHTML = logoutSvg + 'Logout';
            mobileLogoutBtn.innerHTML = logoutSvg + 'Logout';
        }

        // Display student data from session storage
        function displayStudentData() {
            // Get session data
            const sessionData = JSON.parse(sessionStorage.getItem('studentPortalSession'));
            
            if (!sessionData || !sessionData.studentData) {
                showError("No student data available. Please log in again.");
                return false;
            }
            
            const data = sessionData.studentData;
            
            // Update welcome message with student name
            if (data.name) {
                welcomeMessage.textContent = `Welcome, ${data.name}`;
            }
            
            // Display student data
            document.getElementById('name').textContent = data.name || "-";
            document.getElementById('roll').textContent = data.roll_number || sessionData.userId;
            document.getElementById('department').textContent = data.department || "-";
            // Check if user is a rep and show/hide buttons accordingly
            const userRole = data.role || "Student";
            const mobileRepButtonContainer = document.getElementById('mobileRepButtonContainer');
            const mobileViewClassmatesBtn = document.getElementById('mobileViewClassmatesBtn');

            if (userRole === "Rep") {
                mobileRepButtonContainer.style.display = 'flex';
                
                // Add click event listener for mobile button only
                mobileViewClassmatesBtn.addEventListener('click', function() {
                    // Store rep data for the classmates page
                    const repData = {
                        department: data.department,
                        repName: data.name,
                        repRoll: data.roll_number
                    };
                    sessionStorage.setItem('repData', JSON.stringify(repData));
                    window.location.href = 'classmates.html';
                });
            }
            document.getElementById('venue').textContent = data.venue || "-";
            
            // Handle attendance percentage - Updated logic
            let attendancePercentage = data.attendance_percentage;

            // Check for all possible empty/null/undefined cases
            if (attendancePercentage === null || 
                attendancePercentage === undefined || 
                attendancePercentage === "" || 
                attendancePercentage === "-" ||
                isNaN(attendancePercentage)) {
                document.getElementById('attendancePercentage').textContent = "-";
            } else {
                // Convert to number and calculate percentage
                const numericPercentage = parseFloat(attendancePercentage);
                
                if (isNaN(numericPercentage)) {
                    document.getElementById('attendancePercentage').textContent = "-";
                } else {
                    const percentDisplay = (numericPercentage * 100).toFixed(2) + "%";
                    document.getElementById('attendancePercentage').textContent = percentDisplay;
                }
            }
            
            // Update attendance table
            const sessionMappings = [
                { id: 'sep01s1', field: 'sep_01_s1' },
                { id: 'sep01s2', field: 'sep_01_s2' },
                { id: 'sep01s3', field: 'sep_01_s3' },
                { id: 'sep02s1', field: 'sep_02_s1' },
                { id: 'sep02s2', field: 'sep_02_s2' },
                { id: 'sep02s3', field: 'sep_02_s3' },
                { id: 'sep03s1', field: 'sep_03_s1' },
                { id: 'sep03s2', field: 'sep_03_s2' },
                { id: 'sep03s3', field: 'sep_03_s3' },
                { id: 'sep04s1', field: 'sep_04_s1' },
                { id: 'sep04s2', field: 'sep_04_s2' },
                { id: 'sep04s3', field: 'sep_04_s3' }
            ];

            sessionMappings.forEach(mapping => {
                const cellElement = document.getElementById(mapping.id);
                const value = data[mapping.field] || "-";
                
                if (value === "A") {
                    cellElement.innerHTML = '<span class="status-badge badge-absent">Absent</span>';
                } else if (value === "P") {
                    cellElement.innerHTML = '<span class="status-badge badge-present">Present</span>';
                } else {
                    cellElement.textContent = value;
                }
            });
            
            return true;
        }

        // Show error message
        function showError(message) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }

        // Initialize dashboard
        function initDashboard() {
            // Check if user is logged in
            const sessionData = JSON.parse(sessionStorage.getItem('studentPortalSession'));
            
            if (!sessionData || sessionData.expires < Date.now()) {
                // Session expired or doesn't exist, redirect to login
                sessionStorage.removeItem('studentPortalSession');
                window.location.href = '../index.html';
                return;
            }
            
            // Add logout icon
            addLogoutIcon();
            
            // Load student data in the background
            displayStudentData();
            
            // Start simulated loading with minimum 5 seconds
            simulateLoading();
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Start loading sequence
            initDashboard();
        });
    </script>
</body>

</html>
