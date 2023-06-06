<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    // GET recebe/pega informações
    // POST envia informações
    // PUT edita informações: "update"
    // DELETE deleta informações
    // OPTIONS é a relação de métodos disponíveis para uso
    header('Access-Control-Allow-Headers: Content-Type');

    if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
        exit;
    } else{

    }

    include 'conexao.php';

    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $stmt = $conn->prepare("SELECT * FROM quartos");
        $stmt->execute();
        $quartos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo(json_encode($quartos));
    }
    
      if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $numQuarto = $_POST['numQuarto'];
        $tipoQuarto = $_POST['tipoQuarto'];

        $stmt = $conn->prepare("INSERT INTO quartos (numQuarto, tipoQuarto) VALUES (:numQuarto, :tipoQuarto)");
        $stmt->bindParam(':numQuarto', $numQuarto);
        $stmt->bindParam(':tipoQuarto', $tipoQuarto);
        
        if($stmt->execute()){
            echo("Quarto criado com sucesso!");
        } else{
            echo("Erro ao criar Quarto!");
        }
    }

        if($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])){
            $id = $_GET['id'];
            $stmt = $conn->prepare("DELETE FROM quartos WHERE id = :id;");
            $stmt->bindParam(':id', $id);
    
            if($stmt->execute()){
                echo("Quarto excluído com sucesso");
            } else{
                echo("Erro ao excluir quarto.");
            }
        }
        
    if($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])){
        parse_str(file_get_contents("php://input"), $_PUT);

        $id = $_GET['id'];
        $novonumQuarto = $_PUT['numQuarto'];
        $novotipoQuarto = $_PUT['tipoQuarto'];

        $stmt = $conn->prepare("UPDATE quartos SET numQuarto = :numQuarto, tipoQuarto = :tipoQuarto, WHERE id = :id;");
        $stmt->bindParam(':numQuarto', $novonumQuarto);
        $stmt->bindParam(':tipoQuarto', $novotipoQuarto);
        $stmt->bindParam(':id', $id);

        if($stmt->execute()){
            echo("Quarto atualizado com sucesso!");
        } else{
            echo("Erro ao atualizar quarto.");
        }
    }
?>