package com.example.nlp;

import org.apache.opennlp.tools.tokenize.Tokenizer;
import org.apache.opennlp.tools.tokenize.TokenizerME;
import org.apache.opennlp.tools.tokenize.TokenizerModel;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/nlp")
public class NLPController {

    @PostMapping("/tokenize")
    public List<String> tokenize(@RequestBody String text) throws IOException {
        // Load the tokenization model (adjust the path as needed)
        InputStream modelIn = new FileInputStream("en-token.bin");
        TokenizerModel model = new TokenizerModel(modelIn);
        Tokenizer tokenizer = new TokenizerME(model);
        
        // Tokenize the input text
        return Arrays.asList(tokenizer.tokenize(text));
    }
}
