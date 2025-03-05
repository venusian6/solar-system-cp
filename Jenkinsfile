pipeline {
    agent any

    tools {
        nodejs 'node' // Ensure you have the correct Node.js tool setup in Jenkins
    }

    environment {
        // Correct the MONGO_URI and make sure it's properly formed
        MONGO_URI = "mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASSWORD}@cluster0.c74zw.mongodb.net/superaData"
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
                        withCredentials([usernamePassword(credentialsId: 'mongo-db-credentials', passwordVariable: 'MONGO_PASSWORD', usernameVariable: 'MONGO_USERNAME')]) {
                            // Use MONGO_URI inside the application
                            echo "MongoDB credentials injected"
                            // Assuming you're running a Node.js app that needs the MongoDB URI and credentials
                            sh '''
                            export MONGO_URI="mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.c74zw.mongodb.net/superaData"
                            npm test
                            junit '**/test-results/*.xml' // Specify the path to the JUnit test results
                            '''
                        }
                    }
                }

                stage('Code Coverage') {
                    steps {
                        // Implement code coverage logic here if necessary
                        echo 'Running code coverage...'
                    }
                }
            }
        }
    }
}
