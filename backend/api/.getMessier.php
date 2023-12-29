<?php

  // if ($postData->action === all)  
    try {
        $query = "SELECT * FROM Messier ORDER BY IdMessier ASC";

        $statement = $connect->prepare($query);
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
            "error" => "Erreur lors de la recuperation : " . $e->getMessage()
        );
        echo json_encode($response);
    }
?>