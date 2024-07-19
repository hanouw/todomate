pipeline {
    agent any 
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }
    stages {
        stage('Checkout') {
            steps {
                // Git 저장소에서 소스 코드 체크아웃
                git branch: 'master', url: 'https://github.com/hanouw/todomate.git'
            }
        }
        stage('Build') {
            steps {
                // Docker 이미지를 빌드
                script {
                    docker.build("todomate", "-f dockerfile .")
                }
            }
        }
        stage('Cleanup Docker Containers and Images') {
            steps {
                // Docker 컨테이너와 이미지를 정리
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} down --rmi all"
            }
        }
        stage('Deploy') {
            steps {
                // Docker Compose를 사용하여 배포
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
            }
        }
    }
}
