pipeline {
    agent any
    
    tools{
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
        stage('NPM install'){
            steps{
                sh ' npm install --no audit'
            }
        }

        stage('Dependency check'){
parallel{
      stage('NPM Dependency checking'){
                  steps {
                      sh ''' npm audit  --audit-level=critical
                      echo $?
                      '''
                  }
            }
        stage('OWASP Dependency'){
            steps{
              
dependencyCheck additionalArguments: '''--scan ./
 --out ./
--format ALL
--pretty-print''', nvdCredentialsId: 'NVD_API_KEY', odcInstallation: 'OWASP-DEPCHECK-12'


            
            }
        }
    
}
            
            
        }
      
        }
    
}
