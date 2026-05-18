pipeline {
    agent any

    stages {
    
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t myapp .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker rm -f myapp-container || true'
                sh 'docker run -d -p 8083:80 --name myapp-container myapp'
            }
        }
    }
}
