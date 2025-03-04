pipeline {
    agent any
    
    tools {
        nodejs 'node'
    }

    stages {
        stage('Hello') {
            steps {
                sh '''
                node -v
                npm -v
                '''
            }
        }
        
        stage('NPM install') {
            steps {
                sh 'npm install --no audit'
            }
        }

        stage('Dependency check') {
            parallel {
                stage('NPM Dependency checking') {
                    steps {
                        sh '''npm audit --audit-level=critical
                        echo $?
                        '''
                    }
                }

                stage('OWASP Dependency') {
                    steps {
                        dependencyCheck additionalArguments: '''
                        --scan ./
                        --out ./
                        --format ALL
                        --prettyPrint
                        --disableYarnAudit
                        ''', nvdCredentialsId: 'NVD_API_KEY', odcInstallation: 'OWASP-DEPCHECK-12'
                        dependencyCheckPublisher failedTotalCritical: 1, pattern: 'dependency-check-report.xml', skipNoReportFiles: true
                    }
                }
            }
        }
    }
}
