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
            options {
                timestamps() // Correctly specifying timestamps as a function call
            }

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
                        dependencyCheckPublisher failedTotalCritical: 1, pattern: '**/dependency-check-report.xml', stopBuild: true
                        junit allowEmptyResults: true, keepProperties: true, stdioRetention: '', testResults: 'dependency-check-junit.xml'
                        publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
                    }
                }

                stage('Unit Testing') {
                    options {
                        timestamps() // Correctly applying timestamps
                        retry(2)     // Retry the stage 2 times in case of failure
                    }

                    steps {
                        sh 'npm test'
                    }
                }
            }
        }
    }
}
