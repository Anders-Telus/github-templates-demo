# Micro-Front Ends

### Why micro-front ends?

To be able to align business objectives, a common pattern is to create vertical team members across a single capability. Hence a micro front-end can be packaged along side a micro back-end.

A micro front-end patterns enables:

- Reusability of common business functionalities.
- Agility to deploy in isolation.
- Enforce single-responsibility principle.

![MyTelus](https://user-images.githubusercontent.com/1566236/137524288-866ce4e4-9981-4cdd-ba7a-68a9f8d3d381.png)

* Green boxes could be potential micro front-ends

### Tradional ESB vs Micro-Front Ends

#### Tradional ESB

The problem with traditional enterprise software is *how to funnel data* from one application to another siloed application.Enter the Enterprise Service Bus which simply provides a hub where service data could be mutually accessed by applications. This provided a way for applications to coexist independently, but the application design lay within those large-scale applications.

![ESB](https://user-images.githubusercontent.com/1566236/137524549-82403127-52e3-4673-865a-986737d4f62c.png)


#### Micro-Front Ends

In a modern application as we move away from large-scale monolith architecture into small independent services there is no clear pathway between applications to transfer data, like an ESB.

Rather, in a modern architecture, there has to be a way for services to communication with each other that allows for *elastic scalability* (the ability to drop or add services on demand). 

![Micro-Front Ends](https://user-images.githubusercontent.com/1566236/137524500-524af272-7564-4c6b-ba10-4d2132db4a78.png)
