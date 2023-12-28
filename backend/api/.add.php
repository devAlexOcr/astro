<?php

if($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $postData = json_decode(file_get_contents("php://input"), true);

        if($postData === null) {
            throw new Exception("Erreur lors de la lecture des données JSON.");
        }

        $IdMessier = intval($postData['id']);
        $Type = htmlspecialchars($postData['type']);
        $Name = htmlspecialchars($postData['name']);
        $Constellation = htmlspecialchars($postData['constellation']);
        $Visibilite = htmlspecialchars($postData['visibilite']);
    
    $query = "INSERT INTO Messier (IdMessier, Type, Name, Constellation, Visibilite)
                VALUES(:IdMessier, :Type, :Name, :Constellation, :Visibilite)";

    $statement = $connect->prepare($query);
        $statement->bindParam(':IdMessier', $IdMessier, PDO::PARAM_STR);
        $statement->bindParam(':Type', $Type, PDO::PARAM_STR);
        $statement->bindParam(':Name', $Name, PDO::PARAM_STR);
        $statement->bindParam(':Constellation', $Constellation, PDO::PARAM_STR);
        $statement->bindParam(':Visibilite', $Visibilite, PDO::PARAM_STR);
    $statement->execute();

        $response = array(
            "message" => "Element ajouté."
        );
        echo json_encode($response);
    }
    catch (PDOException $e) {
        $response = array(
            "error" => "Erreur lors de l'insertion : " . $e->getMessage()
        );
        echo json_encode($response);
    }
}
?>