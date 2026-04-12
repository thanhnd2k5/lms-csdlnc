CREATE TABLE IF NOT EXISTS classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  teacher_id INT NOT NULL,
  class_code VARCHAR(10) UNIQUE NOT NULL,
  password VARCHAR(255) DEFAULT NULL,
  requires_password BOOLEAN DEFAULT FALSE,
  status ENUM('active', 'inactive') DEFAULT 'active',
  max_students INT DEFAULT 100,
  thumbnail VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES users(id),
  INDEX idx_class_code (class_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS class_courses (
  class_id INT NOT NULL,
  course_id INT NOT NULL,
  requires_approval BOOLEAN DEFAULT FALSE,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (class_id, course_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS class_students (
  class_id INT NOT NULL,
  student_id INT NOT NULL,
  status ENUM('pending', 'active', 'blocked') DEFAULT 'active',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (class_id, student_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS class_students_courses_approval (
  class_id INT NOT NULL,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'blocked') DEFAULT 'pending',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (class_id, student_id, course_id),
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
