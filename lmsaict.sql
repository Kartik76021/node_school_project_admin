-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2023 at 08:37 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lmsaict`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `adminid` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `adminid`, `password`) VALUES
(1, 'aict', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tfee` int(11) NOT NULL,
  `dfee` int(11) NOT NULL,
  `duration` varchar(20) NOT NULL,
  `details` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `image`, `name`, `tfee`, `dfee`, `duration`, `details`) VALUES
(1, 'img1.png', 'PHP With MYSQL', 35000, 28000, '6 Month', 'test1'),
(3, 'img2.png', 'Mern Stack', 35000, 28000, '6 Month', 'test2'),
(4, 'img3.png', 'Python With Django', 15000, 15000, '3 Month', 'test3'),
(5, '20230324T071131471Z851236.jpg', 'PHP With MYSQL', 10000, 8000, '3 Month', '<ol><li><strong>HTML</strong></li><li><strong>CSS</strong></li><li><strong>JS</strong></li><li><strong>Bootstrap</strong></li><li><strong>REACT</strong></li><li><strong>NODE</strong></li><li><strong>Express</strong></li><li><strong>MYSQL</strong></li></ol>'),
(6, '20230324T071812069Z162851.jpg', 'Full Stack Development Using MERN', 35000, 28000, '6 month', '<ol><li><strong>HTML</strong></li><li><strong>CSS</strong></li><li><strong>JS</strong></li><li><strong>Bootstrap</strong></li><li><strong>REACT</strong></li><li><strong>NODE</strong></li><li><strong>Express</strong></li><li><strong>MYSQL</strong></li></ol>');

-- --------------------------------------------------------

--
-- Table structure for table `logo`
--

CREATE TABLE `logo` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `myorder`
--

CREATE TABLE `myorder` (
  `id` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `tfee` int(11) NOT NULL,
  `pfee` int(11) NOT NULL,
  `due_amount` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `myorder`
--

INSERT INTO `myorder` (`id`, `sid`, `cid`, `tfee`, `pfee`, `due_amount`, `create_at`) VALUES
(1, 4, 3, 28000, 2000, 26000, '2023-01-11 08:02:42'),
(4, 6, 1, 35000, 2000, 33000, '2023-01-11 08:23:19'),
(5, 6, 3, 20000, 7000, 13000, '2023-01-11 08:37:31');

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `details` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `nationality` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `image`, `name`, `email`, `phone`, `password`, `gender`, `nationality`, `created_at`) VALUES
(17, '20230317T080332402Z475838.jpg', 'om', 'om@gmail.com', '12345678', '23456', 'M', 'BAN', '2023-03-17 08:03:32'),
(18, '20230324T070121275Z263326.jpg', 'trishna', 'trishna@gmail.com', '1234567890', '123456', 'F', 'SRI', '2023-03-24 07:01:21'),
(19, '20230324T070155221Z848735.jpg', 'Sumanta', 'sumanta@gmail.com', '234567890', '123456', 'M', 'IND', '2023-03-24 07:01:55');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `Title` longtext NOT NULL,
  `link` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `cid`, `Title`, `link`, `created_at`) VALUES
(2, 4, 'Css 1st Class(A)', 'https://www.youtube.com/embed/92JSKy13v7U', '2023-01-06 08:14:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logo`
--
ALTER TABLE `logo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `myorder`
--
ALTER TABLE `myorder`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `logo`
--
ALTER TABLE `logo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `myorder`
--
ALTER TABLE `myorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notice`
--
ALTER TABLE `notice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
