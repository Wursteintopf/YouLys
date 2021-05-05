import {connection} from '../Helper/DatabaseHelper'

export const setUpVideoTable = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video(' +
        'video_id VARCHAR(255) NOT NULL,' +
        'channel_id VARCHAR(255),' +
        'upload_time TIMESTAMP,' +
        'duration INT,' +
        'PRIMARY KEY (video_id),' +
        'FOREIGN KEY (channel_id) REFERENCES channel(channel_id)' +
      ')',

      err => {
        if (err) reject(err)
        resolve(true)
      }
    )
  })
}

export const setUpVideoStatisticTable = (): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video_statistic(' +
        'video_statistic_id INT NOT NULL AUTO_INCREMENT,' +
        'video_id VARCHAR(255),' +
        'views VARCHAR(255),' +
        'title VARCHAR(255),' +
        'thumbnail VARCHAR(255),' +
        'description VARCHAR(5000),' +
        'tags VARCHAR(1024),' +
        'likes INT,' +
        'dislikes INT,' +
        'favoriteCount INT,' +
        'commentCount INT,' +
        'PRIMARY KEY (video_statistic_id),' +
        'FOREIGN KEY (video_id) REFERENCES video(video_id)' +
      ')',

      err => {
        if (err) reject(err)
        resolve(true)
      }
    )
  })
}