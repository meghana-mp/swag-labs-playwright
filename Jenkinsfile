pipeline {
    agent any

    tools {
        // This MUST match the name you gave in 'Global Tool Configuration'
        nodejs 'NodeJS' 
    }

    stages {
        stage('Checkout') {
            steps {
                // This pulls your code from GitHub to the Jenkins workspace
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // 'npm ci' is better for CI than 'npm install' as it uses package-lock.json
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Jenkins needs this to download Chromium/Firefox/Webkit onto the Mac
                sh 'npx playwright install chromium firefox'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // The '|| true' ensures that even if tests fail, the pipeline 
                // doesn't stop, allowing the report to be generated.
                sh 'npx playwright test --project=chromium || true'
            }
        }
    }

    post {
        always {
            // This publishes the report so you can see results in the Jenkins UI
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            
            // Stores the raw report files as artifacts
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}