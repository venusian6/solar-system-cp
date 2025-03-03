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
    }
}
