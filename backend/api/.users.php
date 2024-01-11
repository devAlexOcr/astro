<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    try {

        $postData = json_decode(file_get_contents("php://input"), true);

        if($postData === null) {
            throw new Exception("Erreur lors de la lecture des données JSON du login.");
        }

        $Pseudo = htmlspecialchars($postData['pseudo']);
        $Password = password_hash($postData['password'], PASSWORD_DEFAULT);

        // verification qu'il n'y a pas de compte deja créé avec ce pseudo
        $query = "SELECT * FROM users WHERE pseudo = :pseudo";
        
        $statement = $connect->prepare($query);
            $statement->bindParam(':pseudo', $Pseudo, PDO::PARAM_STR);
        $statement->execute();

        while($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        }
        // si pseudo non trouvé, ajout du nouveau user
            if(count($data) === 0) {
              
                $query = "INSERT INTO users (pseudo, password) VALUES (:pseudo, :password)";

                $statement = $connect->prepare($query);
                    $statement->bindParam(':pseudo', $Pseudo, PDO::PARAM_STR);
                    $statement->bindParam(':password', $Password, PDO::PARAM_STR);
                $statement->execute();

                $lastId = $connect->lastInsertId();

                // Creation de la Table $postData['pseudo']

                $queryCreateTable = "CREATE TABLE " . $postData['pseudo'] . "Messier" . " (
                    IdMessier INT(11) PRIMARY KEY NOT NULL, 
                    Image BLOB NOT NULL,
                    date DATE NOT NULL
                )";

                $statement = $connect->prepare($queryCreateTable);
                $statement->execute();

                $rep[0]['pseudo'] = $Pseudo;
                $rep[0]['id'] = $lastId;
                $rep[1]['SQL'] = "Table created";
            }
            
            if (count($data) === 1) {
                $hash = $data[0]["Password"];
                if(password_verify($postData['password'], $hash)) {

                    $queryValue = '../../public/assets/images/scopes.png';


                    //JOIN les table users et messiers

                    $queryUpdateImage = "UPDATE Messier INNER JOIN " . $postData['pseudo'] . "Messier" . " ON Messier.IdMessier = " . $postData['pseudo'] . "Messier" . ".IdMessier SET Messier.Image = " . $postData['pseudo'] . "Messier.Image";
    
                    $statement = $connect->prepare($queryUpdateImage);
                    $statement->execute();

                    $rep[0]['message'] = "Utilisateur reconnu";
                    $rep[0]['status'] = "Connected";
                    $rep[1]['SQL'] = "success ! image is updated"; 

                } else {                 
                    $rep[0]['message'] = "paire Pseudo / Password incorrect";
                    $rep[0]['status'] = "Disconnect";
                }   
            } 
        }
    
    catch (PDOException $e) {
            $res = array(
                "error" => "Erreur lors login : " . $e->getMessage()
            ); 
        }  
        echo json_encode($rep); 
    }
 
?>