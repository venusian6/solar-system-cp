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
            stage('NPM Dependency checking'){
                  steps{
                      sh ''' npm audit-level=critical
                      echo $?
                      '''
                  }
            }
        }
    }
}
