      WITH ss AS
            (SELECT  
              time_noise, track, slow, distance, aircraft_time, temperature, humadity, presure, wind
            FROM
                omsk.noise
            WHERE
                (track, time_noise, slow) IN
                (
                SELECT
                  DISTINCT ON (track)
                  track, time_noise, slow --MAX(slow) OVER (PARTITION BY track) AS mx
                FROM
                  omsk.noise
                WHERE
                  base_name='OMSK001' AND slow >= 20 AND slow <= 100 AND distance <= 3000000 AND time_noise >=  '2018-08-01' AND time_noise <= '2018-09-01'
                ORDER BY track, slow DESC
                ) 
            ORDER BY time_noise
            )
            SELECT
                ss.time_noise, ss.slow, ss.track, ss.aircraft_time, ss.temperature, ss.humadity, ss.presure, ss.wind,
                omsk.aircraft_tracks.icao, omsk.aircraft_tracks.type_of_flight, omsk.aircraft_tracks.vpp_angle, eco.aircrafts.type, eco.aircrafts.operator,
                omsk.tracks.callsign, omsk.tracks.altitude, omsk.tracks.speed, omsk.tracks.angle, omsk.tracks.latitude, omsk.tracks.longitude, omsk.tracks.vertical_speed, omsk.tracks.distance_1
            FROM ss
      LEFT JOIN omsk.aircraft_tracks ON ss.track = omsk.aircraft_tracks.track
      LEFT JOIN eco.aircrafts ON omsk.aircraft_tracks.icao  = eco.aircrafts.icao
      LEFT JOIN omsk.tracks ON ss.track  = omsk.tracks.track AND omsk.tracks.time_track = ss.aircraft_time
      LEFT JOIN eco.routes ON omsk.tracks.callsign  = eco.routes.callsign;


                -- SELECT
                --   -- track, time_noise, MAX(slow) OVER (PARTITION BY track) AS mx
                --   track, time_noise, MAX(slow) as mx
                -- FROM
                --   omsk.noise
                -- -- WHERE
                --   -- base_name='OMSK001' AND slow >= 20 AND slow <= 100 AND distance <= 3000000 AND time_noise >=  '2018-08-01' AND time_noise <= '2018-09-01'
                -- GROUP BY track ;
