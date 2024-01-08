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

                $rep[0]['pseudo'] = $Pseudo;
                $rep[0]['id'] = $lastId;
                echo json_encode($rep);
            }
            if (count($data) === 1) {
                $hash = $data[0]["Password"];
                if(password_verify($postData['password'], $hash)) {
                    // fusion des tables Messier et objetUser
                    $rep[0]['message'] = "Utilisateur reconnu";
                    $rep[0]['status'] = "Connected";
                } else {                 
                    $rep[0]['message'] = "paire Pseudo / Password incorrect";
                    $rep[0]['status'] = "Disconnect";
                    $rep[0]['hash'] = $hash;
                    $rep[0]['Password'] = $Password;
                }
                echo json_encode($rep);
            }
        }
        catch (PDOException $e) {
            $response = array(
                "error" => "Erreur lors login : " . $e->getMessage()
            );
            echo json_encode($response);
        }
}
?>