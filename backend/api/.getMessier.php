<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $postData = json_decode(file_get_contents("php://input"), true);
            if($postData === null) {
                throw new Exception("Erreur lors de la lecture des données JSON.");
            }

        $Type = $postData['option'];

        switch($postData['option']) {        
            case "All":
                $query = "SELECT * FROM Messier ORDER BY IdMessier ASC";
                break;
            case "Galaxie":
                $query = "SELECT * FROM Messier WHERE Type = :Type ORDER BY IdMessier ASC";
                break; 
            case "Nébuleuse":
                $query = "SELECT * FROM Messier WHERE Type = :Type ORDER BY IdMessier ASC";
                break;
            case "Nébuleuse Planétaire":
                $query = "SELECT * FROM Messier WHERE Type = :Type ORDER BY IdMessier ASC";
                break;
            case "Amas Globulaire":
                $query = "SELECT * FROM Messier WHERE Type = :Type ORDER BY IdMessier ASC";
                break;
            case "Amas Ouvert":
                $query = "SELECT * FROM Messier WHERE Type = :Type ORDER BY IdMessier ASC";
                break;
        }

        $statement = $connect->prepare($query);
            if ($Type !== "All")    
                {
                    $statement->bindParam(':Type', $Type, PDO::PARAM_STR);
                }         
        $statement->execute();

        $data = $statement->fetchAll(PDO::FETCH_ASSOC);
            if($data === false) {
                $response = array(
                    "error" => "Aucune donnée récupérée"
                );
                echo json_encode($response);
            }else {
                echo json_encode($data);
            }
    }
    catch (PDOException $e) {
        $response = array(
            "error" => "Erreur lors de l'insertion : " . $e->getMessage()
        );
        echo json_encode($response);
    }
};  
    
?>